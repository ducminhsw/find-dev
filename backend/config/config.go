package config

type PackageType string

var NoPackage PackageType = "none"
var ProPackage PackageType = "pro"
var PremiumPackage PackageType = "premium"
var PremiumAnnualyPackage PackageType = "annual"

var CostPerMonth int = 229
var CostPerMonthInvite int = 29
var FreeInviteMonth int = 5

var CostPerMonthPremium int = 429
var CostPerMonthPremiumInvite int = 19
var FreeInviteMonthPremium = 10

var CostPerYear int = 2299
var CostPerYearInvite int = 15
var FreeInviteYear = 12

type UserType string

var DEV UserType = "user"
var HR UserType = "hr"
