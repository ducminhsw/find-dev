package validator

import "unicode/utf8"

func ValidateLength(errMap map[string]string, field string, value string, minLength, maxLength int) {
	if utf8.RuneCountInString(value) <= minLength || utf8.RuneCountInString(value) >= maxLength {
		errMap[field] = "Length is not valid"
		return
	}
	delete(errMap, field)
}
