package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.ducminhsw.find-dev/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type application struct {
	Mongo              *mongo.Client
	UserInterface      models.UserInterface
	DeveloperInterface models.DeveloperInterface
	RecruiterInterface models.RecruiterInterface
}

type CustomError error

func main() {
	// set custom configuration at the start
	addr := flag.String("addr", ":8000", "Port address for running backend services")
	flag.Parse()

	parsed := flag.Parsed()
	if !parsed {
		log.Println("Can not parse the custom flag argument, use the default setting instead.")
	}

	// create one (and only) MongoDB client for the application
	mongoClient, err := createClient()
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := mongoClient.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	app := &application{
		Mongo:              mongoClient,
		DeveloperInterface: &models.DeveloperModel{Coll: mongoClient.Database("FindDevDB").Collection("dev")},
		RecruiterInterface: &models.RecuiterModel{Coll: mongoClient.Database("FindDevDB").Collection("rec")},
	}

	svr := &http.Server{
		Addr:         *addr,
		Handler:      app.route(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recover. Error:\n", r)
		}
	}()
	err = svr.ListenAndServe()
	if err != nil {
		panic("Server crashed.")
	}
}

func createClient() (*mongo.Client, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		return nil, errors.New("mongo uri must be provided")
	}
	opts := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		return nil, errors.New("no connection found")
	}

	// sending a ping to verify the connection
	var result bson.M
	err = client.Database("FindDevDB").RunCommand(
		context.TODO(),
		bson.D{{Key: "ping", Value: 1}},
	).Decode(&result)
	if err != nil {
		return nil, err
	}
	log.Println("Database pinged success.")

	return client, nil
}
