package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func (app *application) HandleLogin() echo.HandlerFunc {
	type Request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type Response struct {
		Code int         `json:"code"`
		Data interface{} `json:"data"`
	}
	return func(c echo.Context) error {
		var r Request

		err := json.NewDecoder(c.Request().Body).Decode(&r)
		if err != nil {
			res := &Response{
				Code: echo.ErrBadRequest.Code,
				Data: nil,
			}
			return c.JSON(echo.ErrBadRequest.Code, *res)
		}

		if len(r.Email) < 5 {
			res := &Response{
				Code: echo.ErrBadRequest.Code,
				Data: nil,
			}
			return c.JSON(echo.ErrBadRequest.Code, *res)
		}

		if len(r.Password) < 8 {
			res := &Response{
				Code: echo.ErrBadRequest.Code,
				Data: nil,
			}
			return c.JSON(echo.ErrBadRequest.Code, *res)
		}

		dev, err := app.UserInterface.GetUserByEmail(r.Email, app.DeveloperInterface.GetCollection(), app.RecruiterInterface.GetCollection())
		if err != nil {
			return c.JSON(http.StatusOK, errors.New("user not found"))
		}

		err = bcrypt.CompareHashAndPassword([]byte(dev.HashPassword), []byte(r.Password))
		if err != nil {
			res := &Response{
				Code: echo.ErrConflict.Code,
				Data: nil,
			}
			return c.JSON(echo.ErrBadRequest.Code, *res)
		}

		err = bcrypt.CompareHashAndPassword([]byte(dev.HashPassword), []byte(r.Password))
		if err != nil {
			res := &Response{
				Code: echo.ErrConflict.Code,
				Data: nil,
			}
			return c.JSON(echo.ErrBadRequest.Code, *res)
		}

		res := &Response{
			Code: http.StatusOK,
		}
		return c.JSON(http.StatusOK, *res)
	}
}

func (app *application) HandleVerify() echo.HandlerFunc {
	type Response struct {
		Code int         `json:"code"`
		Data interface{} `json:"data"`
	}
	return func(c echo.Context) error {
		email := c.QueryParam("email")
		code := c.QueryParam("code")
		t := c.QueryParam("type")

		if len(email) == 0 || len(code) == 0 || len(t) == 0 {
			return c.JSON(http.StatusOK, Response{Code: 401})
		}

		_, err := strconv.Atoi(t)
		if err != nil {
			return c.JSON(http.StatusBadGateway, nil)
		}

		user, err := app.UserInterface.GetUserByEmail(email, app.DeveloperInterface.GetCollection(), app.RecruiterInterface.GetCollection())
		if err != nil {
			return c.JSON(http.StatusOK, Response{Code: 401})
		}
		if (*user).VerifyCode != code {
			return c.JSON(http.StatusOK, Response{Code: 401})
		}
		if (*user).Activated {
			return c.JSON(http.StatusOK, Response{Code: 401})
		}

		user.Activated = true
		err = app.UserInterface.ActivateUserAccount()
		if err != nil {
			return c.JSON(http.StatusOK, Response{Code: 401})
		}

		var rsp = Response{
			Code: 200,
		}
		return c.JSON(http.StatusOK, rsp)
	}
}
