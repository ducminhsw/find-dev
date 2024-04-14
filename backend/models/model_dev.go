package models

import (
	"context"

	"github.ducminhsw.find-dev/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Language struct {
	Name  string
	Level string
}

type Experience struct {
	Company string `json:"company"`
	Years   int    `json:"years"`
	Work    string `json:"work"`
}

type OtherProjects struct {
	Name      string `json:"name"`
	TechStack string `json:"techstack"`
	Duration  string `json:"duration"`
	Purpose   string `json:"purpose"`
}

type Developer struct {
	Email        string          `json:"email"`
	HashPassword string          `json:"hashPassword"`
	Firstname    string          `json:"firstname"`
	Lastname     string          `json:"lastname"`
	Username     string          `json:"username"`
	AvatarLink   string          `json:"avatarLink"`
	VerifyCode   string          `json:"verifyCode"`
	Activated    bool            `json:"activated"`
	UserType     config.UserType `json:"type"`

	Objective   string          `json:"objective"`
	MainSkill   Language        `json:"mainskill"`
	OtherSkill  []Language      `json:"otherskill"`
	Expericence []Experience    `json:"exp"`
	Projects    []OtherProjects `json:"projects"`
}

type DeveloperModel struct {
	Coll *mongo.Collection
}

type DeveloperInterface interface {
	FindDeveloperById(string) (Developer, error)
	FindDeveloperByEmail(string) (Developer, error)
	CreateDeveloper(Developer) error
	UpdateDeveloper(Developer) error
	GetCollection() *mongo.Collection
	Exists(string) (bool, error)
}

func (dc DeveloperModel) FindDeveloperById(id string) (Developer, error) {
	var dev *Developer
	coll := dc.Coll

	filter := bson.D{
		{Key: "_id", Value: bson.D{{Key: "$eq", Value: id}}},
	}
	result := coll.FindOne(context.TODO(), filter)
	err := result.Decode(&dev)
	if err == nil {
		return *dev, nil
	}
	if err == mongo.ErrNoDocuments {
		return *dev, nil
	}
	return *dev, err
}

func (dc DeveloperModel) FindDeveloperByEmail(email string) (Developer, error) {
	var dev *Developer
	coll := dc.Coll

	filter := bson.D{
		{Key: "_id", Value: bson.D{{Key: "$eq", Value: email}}},
	}
	result := coll.FindOne(context.TODO(), filter)
	err := result.Decode(&dev)
	if err == nil {
		return *dev, nil
	}
	if err == mongo.ErrNoDocuments {
		return *dev, nil
	}
	return *dev, err
}

func (dc DeveloperModel) CreateDeveloper(d Developer) error {
	collection := dc.Coll

	_, err := collection.InsertOne(context.TODO(), d)
	if err != nil {
		return err
	}

	return nil
}

func (dc DeveloperModel) UpdateDeveloper(d Developer) error {
	collection := dc.Coll

	filter := bson.D{
		{Key: "email", Value: bson.D{{Key: "$eq", Value: d.Email}}},
	}
	_, err := collection.UpdateOne(context.TODO(), filter, d)
	if err != nil {
		return err
	}

	return nil
}

func (dc DeveloperModel) GetCollection() *mongo.Collection {
	return dc.Coll
}

func (dc DeveloperModel) Exists(email string) (bool, error) {
	var d *Developer
	coll := dc.Coll
	filter := bson.D{
		{Key: "email", Value: bson.D{{Key: "$eq", Value: email}}},
	}

	err := coll.FindOne(context.TODO(), filter).Decode(&d)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, err
	}

	return true, nil
}
