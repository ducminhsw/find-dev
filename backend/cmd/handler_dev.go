package main

import (
	"context"
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.ducminhsw.find-dev/config"
	"github.ducminhsw.find-dev/models"
	"github.ducminhsw.find-dev/validator"
	"golang.org/x/crypto/bcrypt"
)

func (app *application) HandlerEngineerRegister() echo.HandlerFunc {
	type Request struct {
		Email      string            `json:"email"`
		Password   string            `json:"password"`
		Firstname  string            `json:"firstname"`
		Lastname   string            `json:"lastname"`
		Username   string            `json:"username"`
		AvatarLink string            `json:"avatarLink"`
		UserType   config.UserType   `json:"type"`
		MainSkill  string            `json:"mainSkill"`
		Level      string            `json:"level"`
		Skills     []models.Language `json:"skills"`
	}

	type Response struct {
		Code int         `json:"code"`
		Data interface{} `json:"data"`
	}

	return func(c echo.Context) error {
		ctx, cancel := context.WithTimeout(c.Request().Context(), 1*time.Second)
		c.SetRequest(c.Request().Clone(ctx))
		defer cancel()

		rsChan := make(chan Response)
		go func() {
			var rq *Request
			var rs *Response

			err := json.NewDecoder(c.Request().Body).Decode(&rq)
			if err != nil {
				log.Println("decode err", err)
				rs = &Response{
					Code: http.StatusBadRequest,
					Data: nil,
				}
				rsChan <- *rs
			}

			var errorMap = make(map[string]string)
			validator.ValidateLength(errorMap, "email", rq.Email, 5, 30)
			validator.ValidateLength(errorMap, "password", rq.Password, 8, 32)
			validator.ValidateLength(errorMap, "firstname", rq.Firstname, 3, 20)
			validator.ValidateLength(errorMap, "lastname", rq.Lastname, 3, 20)
			validator.ValidateLength(errorMap, "username", rq.Username, 3, 15)
			validator.ValidateLength(errorMap, "mainSkill", rq.MainSkill, 1, 10)
			validator.ValidateLength(errorMap, "level", rq.Level, 2, 10)
			if len(errorMap) > 0 {
				log.Println("len error", errorMap)
				rs = &Response{
					Code: http.StatusBadRequest,
					Data: nil,
				}
				rsChan <- *rs
			}

			password, err := bcrypt.GenerateFromPassword([]byte(rq.Password), 12)
			if err != nil {
				log.Println("password err", err)
				rs = &Response{
					Code: http.StatusInternalServerError,
					Data: nil,
				}
				rsChan <- *rs
			}

			src := rand.NewSource(100000)
			rd := rand.New(src)
			code := strconv.Itoa(rd.Int())
			dev := &models.Developer{
				Email:        rq.Email,
				HashPassword: string(password),
				Firstname:    rq.Firstname,
				Lastname:     rq.Lastname,
				Username:     rq.Username,
				AvatarLink:   rq.AvatarLink,
				VerifyCode:   code,
				UserType:     rq.UserType,
				Activated:    false,
			}
			isExist, err := app.DeveloperInterface.Exists(dev.Email)
			if err != nil {
				rs = &Response{
					Code: http.StatusInternalServerError,
					Data: nil,
				}
				rsChan <- *rs
			}
			if isExist {
				rs = &Response{
					Code: http.StatusBadRequest,
					Data: nil,
				}
				rsChan <- *rs
			}

			err = app.DeveloperInterface.CreateDeveloper(*dev)
			if err != nil {
				rs = &Response{
					Code: http.StatusInternalServerError,
					Data: nil,
				}
				rsChan <- *rs
			}

			rs = &Response{
				Code: http.StatusOK,
				Data: nil,
			}
			rsChan <- *rs
		}()

		select {
		case <-c.Request().Context().Done():
			log.Println("Into context done")
			return HandlerResponse(c, http.StatusInternalServerError, nil)
		case it := <-rsChan:
			log.Println("Into request done")
			return HandlerResponse(c, http.StatusOK, it)
		}
	}
}

func (app *application) HandlerEngineerPostDetail() echo.HandlerFunc {
	type Request struct {
		Emai        string                 `json:"email"`
		Objective   string                 `json:"objective"`
		MainSkill   string                 `json:"mainskill"`
		Level       string                 `json:"level"`
		OtherSkill  []models.Language      `json:"otherskill"`
		Expericence []models.Experience    `json:"experience"`
		Projects    []models.OtherProjects `json:"projects"`
	}

	return func(c echo.Context) error {
		var rq *Request

		err := json.NewDecoder(c.Request().Body).Decode(&rq)
		if err != nil {
			return HandlerResponse(c, http.StatusBadRequest, nil)
		}

		errsMap := make(map[string]string)
		validator.ValidateLength(errsMap, rq.Emai, "email", 5, 25)
		validator.ValidateLength(errsMap, rq.Objective, "email", 5, 400)
		validator.ValidateLength(errsMap, rq.MainSkill, "email", 3, 15)
		validator.ValidateLength(errsMap, rq.Level, "email", 3, 10)
		if len(errsMap) > 0 {
			return HandlerResponse(c, http.StatusBadRequest, nil)
		}

		return HandlerResponse(c, http.StatusOK, nil)
	}
}

func HandlerResponse(c echo.Context, code int, data interface{}) error {
	type Response struct {
		Code int
		Data interface{}
	}
	rs := &Response{
		Code: code,
		Data: data,
	}
	return c.JSON(code, rs)
}
