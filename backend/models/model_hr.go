package models

import (
	"context"

	"github.ducminhsw.find-dev/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Recruiter struct {
	Email        string             `json:"email"`
	HashPassword string             `json:"hashPassword"`
	Username     string             `json:"username"`
	Firstname    string             `json:"firstname"`
	Lastname     string             `json:"lastname"`
	AvatarLink   string             `json:"avatarLink,omitempty"`
	VerifyCode   string             `json:"verifyCode"`
	Activated    bool               `json:"activated"`
	MonthRemain  int                `json:"remain"`
	PackageType  config.PackageType `json:"packageType"`
}

type RecuiterModel struct {
	Coll *mongo.Collection
}

type RecruiterInterface interface {
	FindRecuiterById(string) (bool, error)
	FindRecuiterByEmail(string) (bool, error)
	CreateRecruiter(Recruiter) error
	UpdateRecruiter(Recruiter) error
	Subscribe(*Recruiter, int) error
	GetCollection() *mongo.Collection
}

func (rm *RecuiterModel) FindRecuiterById(id string) (bool, error) {
	collection := rm.Coll

	var r *Recruiter
	filter := bson.D{
		{Key: "_id", Value: bson.D{{Key: "$eq", Value: id}}},
	}
	err := collection.FindOne(context.TODO(), filter).Decode(&r)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func (rm *RecuiterModel) FindRecuiterByEmail(email string) (bool, error) {
	collection := rm.Coll

	var r *Recruiter
	filter := bson.D{
		{Key: "email", Value: bson.D{{Key: "$eq", Value: email}}},
	}
	err := collection.FindOne(context.TODO(), filter).Decode(&r)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func (rm *RecuiterModel) CreateRecruiter(r Recruiter) error {
	collection := rm.Coll

	_, err := collection.InsertOne(context.TODO(), r)
	if err != nil {
		return err
	}

	return nil
}

func (rm *RecuiterModel) UpdateRecruiter(r Recruiter) error {
	collection := rm.Coll

	filter := bson.D{
		{Key: "email", Value: bson.D{{Key: "$eq", Value: r.Email}}},
	}
	_, err := collection.UpdateOne(context.TODO(), filter, r)
	if err != nil {
		return err
	}

	return nil
}

func (rm *RecuiterModel) Subscribe(r *Recruiter, t int) error {
	collection := rm.Coll

	filter := bson.D{
		{Key: "email", Value: bson.D{{Key: "$eq", Value: r.Email}}},
	}
	r.MonthRemain = r.MonthRemain + t
	_, err := collection.UpdateOne(context.TODO(), filter, r)
	if err != nil {
		return err
	}

	return nil
}

func (rm *RecuiterModel) GetCollection() *mongo.Collection {
	return rm.Coll
}

func (rc *RecuiterModel) Exists(email string) (bool, error) {
	var d *Developer
	coll := rc.Coll
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
