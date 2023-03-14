package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"

	cigClient "github.com/tobiaszgithub/cig/client"
	cigConfig "github.com/tobiaszgithub/cig/config"
	"github.com/tobiaszgithub/cig/model"
)

var TenantKey string

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

type Person struct {
	Name    string   `json:"name"`
	Age     uint8    `json:"age"`
	Address *Address `json:"address"`
}

type Address struct {
	Street   string `json:"street"`
	Postcode string `json:"postcode"`
}

// Greet returns a greeting for the given name
func (a *App) Greet(p Person) string {
	return fmt.Sprintf("Hello %s (Age: %d)!", p.Name, p.Age)
}

//SetTenantKey set TenantKey
func (a *App) SetTenantKey(tenantKey string) error {

	TenantKey = tenantKey
	return nil
}

//GetIntegrationPackages Get IntegrationFlows
func (a *App) GetIntegrationPackages() ([]model.IntegrationPackage, error) {
	conf, err := cigConfig.NewConfiguration(TenantKey)
	if err != nil {
		log.Print(err)
		return []model.IntegrationPackage{}, err
	}
	resp, err := cigClient.GetIntegrationPackages(conf)

	return resp.D.Results, err
}

//GetFlowsOfIntegrationPackage it will
func (a *App) GetFlowsOfIntegrationPackage(packageName string) ([]model.IntegrationFlow, error) {
	conf, err := cigConfig.NewConfiguration(TenantKey)
	if err != nil {
		log.Print(err)
		return []model.IntegrationFlow{}, err
	}
	resp, err := cigClient.GetFlowsOfIntegrationPackage(conf, packageName)

	return resp.D.Results, err
}

//InspectFlow Get integration flow
func (a *App) InspectFlow(flowID string) (model.IntegrationFlow, error) {
	conf, err := cigConfig.NewConfiguration(TenantKey)
	if err != nil {
		log.Print(err)
		return model.IntegrationFlow{}, err
	}
	resp, err := cigClient.InspectFlow(conf, flowID, "active")

	return resp.D, err

}

//TransportFlow Transport iFlow
func (a *App) TransportFlow(srcFlowID string, destFlowID string, destTenantKey string, destFlowName string, destPackageID string) (string, error) {
	conf, err := cigConfig.NewConfiguration(TenantKey)
	if err != nil {
		log.Print(err)
		return "", err
	}

	destConf, err := cigConfig.NewConfiguration(destTenantKey)
	if err != nil {
		log.Print(err)
		return "", err
	}

	var out bytes.Buffer
	err = cigClient.TransportFlow(&out, conf, srcFlowID, destConf, destFlowID, destFlowName, destPackageID)
	if err != nil {
		log.Print(err)
		return "", err
	}

	return out.String(), err
}

//GetConfigurationFile Get Configuration File
func (a *App) GetConfigurationFile() (cigConfig.ConfigurationFile, error) {
	confAll := cigConfig.ConfigurationFile{}
	// path, _ := os.Getwd()
	// println("os.Getwd(): ", path)

	configFile, err := os.Open("./config.json")
	if err != nil {
		homePath, _ := os.UserHomeDir()
		configFilePath := filepath.Join(homePath, ".cig", "config.json")
		log.Println("Config file path: ", configFilePath)
		configFile, err = os.Open(configFilePath)
		if err != nil {
			err = fmt.Errorf("error opening config.json: %w", err)
			return confAll, err
		}

	}

	defer configFile.Close()

	err = json.NewDecoder(configFile).Decode(&confAll)
	if err != nil {
		return confAll, err
	}

	return confAll, err
}

//SaveConfigurationFile Save Configuration File
func (a *App) SaveConfigurationFile(config cigConfig.ConfigurationFile) error {

	homePath, _ := os.UserHomeDir()
	configDir := filepath.Join(homePath, ".cig")
	err := os.MkdirAll(configDir, os.ModePerm)
	if err != nil {
		return err
	}

	configFilePath := filepath.Join(homePath, ".cig", "config.json")

	configFile, err := os.OpenFile(configFilePath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer configFile.Close()

	enc := json.NewEncoder(configFile)
	enc.SetIndent("", "\t")

	err = enc.Encode(config)
	if err != nil {
		return err
	}

	return nil

}
