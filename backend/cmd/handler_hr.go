package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.ducminhsw.find-dev/config"
	"github.ducminhsw.find-dev/models"
	"github.ducminhsw.find-dev/validator"
	"golang.org/x/crypto/bcrypt"
)

func (app *application) HandlerRecruiterRegister() echo.HandlerFunc {
	type Request struct {
		Email      string          `json:"email"`
		Password   string          `json:"password"`
		Firstname  string          `json:"firstname"`
		Lastname   string          `json:"lastname"`
		Username   string          `json:"username"`
		AvatarLink string          `json:"avatarLink,omitempty"`
		UserType   config.UserType `json:"type"`
	}

	type Response struct {
		Code int         `json:"code"`
		Data interface{} `json:"data"`
	}

	return func(c echo.Context) error {
		var rq *Request
		var rs *Response

		err := json.NewDecoder(c.Request().Body).Decode(&rq)
		if err != nil {
			rs = &Response{
				Code: http.StatusBadRequest,
				Data: nil,
			}
			return c.JSON(http.StatusBadRequest, rs)
		}

		var errorMap = make(map[string]string)
		validator.ValidateLength(errorMap, "email", rq.Email, 5, 30)
		validator.ValidateLength(errorMap, "firstname", rq.Email, 3, 20)
		validator.ValidateLength(errorMap, "lastname", rq.Email, 3, 20)
		validator.ValidateLength(errorMap, "username", rq.Email, 3, 15)
		if len(errorMap) > 0 {
			rs = &Response{
				Code: http.StatusBadRequest,
				Data: nil,
			}
			return c.JSON(http.StatusBadRequest, rs)
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(rq.Password), 12)
		if err != nil {
			rs = &Response{
				Code: http.StatusBadRequest,
				Data: nil,
			}
			return c.JSON(http.StatusBadRequest, rs)
		}

		src := rand.NewSource(100000)
		rd := rand.New(src)
		code := strconv.Itoa(rd.Int())
		r := &models.Recruiter{
			Email:        rq.Email,
			HashPassword: string(hash),
			Username:     rq.Username,
			Firstname:    rq.Firstname,
			Lastname:     rq.Lastname,
			AvatarLink:   rq.AvatarLink,
			VerifyCode:   code,
			Activated:    false,
			MonthRemain:  0,
			PackageType:  "none",
		}
		isExist, err := app.DeveloperInterface.Exists(r.Email)
		if err != nil {
			rs = &Response{
				Code: http.StatusInternalServerError,
				Data: nil,
			}
			return c.JSON(http.StatusInternalServerError, rs)
		}
		if isExist {
			rs = &Response{
				Code: http.StatusBadRequest,
				Data: nil,
			}
			return c.JSON(http.StatusBadRequest, rs)
		}

		err = app.RecruiterInterface.CreateRecruiter(*r)
		if err != nil {
			rs = &Response{
				Code: http.StatusBadRequest,
				Data: nil,
			}
			return c.JSON(http.StatusBadRequest, rs)
		}

		rs = &Response{
			Code: http.StatusOK,
			Data: nil,
		}
		return c.JSON(http.StatusOK, rs)
	}
}
