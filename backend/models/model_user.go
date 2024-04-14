package models

import (
	"github.ducminhsw.find-dev/config"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	Email        string          `json:"email"`
	HashPassword string          `json:"hashPassword"`
	Firstname    string          `json:"firstname"`
	Lastname     string          `json:"lastname"`
	Username     string          `json:"username"`
	AvatarLink   string          `json:"avatarLink"`
	VerifyCode   string          `json:"verifyCode"`
	Activated    bool            `json:"activated"`
	UserType     config.UserType `json:"type"`
}

type UserModel struct {
	Database *mongo.Database
}

type UserInterface interface {
	ActivateUserAccount() error
	GetUserByEmail(string, *mongo.Collection, *mongo.Collection) (*User, error)
}

func (um UserModel) ActivateUserAccount() error {
	return nil
}

func (um UserModel) GetUserByEmail(email string, devColl *mongo.Collection, hrColl *mongo.Collection) (interface{}, error) {
	return nil, nil
}
