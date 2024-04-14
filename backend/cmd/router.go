package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (app *application) route() http.Handler {
	e := echo.New()
	auth := e.Group("/auth")
	auth.POST("/login", app.HandleLogin())
	auth.POST("/verify", app.HandleVerify())

	recruiter := e.Group("/recruiter")
	recruiter.POST("/register", app.HandlerRecruiterRegister())
	recruiter.POST("/package/paid", app.HandlerRecruiterRegister())
	recruiter.POST("/package/upgrade", app.HandlerRecruiterRegister())
	recruiter.POST("/request/user", app.HandlerRecruiterRegister())
	recruiter.POST("/register", app.HandlerRecruiterRegister())

	developer := e.Group("/developer")
	developer.POST("/register", app.HandlerEngineerRegister())
	developer.POST("/register", app.HandlerEngineerRegister())
	developer.POST("/register", app.HandlerEngineerRegister())
	developer.POST("/register", app.HandlerEngineerRegister())
	developer.POST("/register", app.HandlerEngineerRegister())

	return e
}
