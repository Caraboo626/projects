#include "Actor.h"

using namespace std;

Actor::Actor() {

	firstName = "Christoph";
	lastName = "Waltz";
	birthYear = 1956;

}

Actor::Actor(std::string aFirstName, std::string aLastName, int aBirthYear) {
	firstName = aFirstName;
	lastName = aLastName;
	birthYear = aBirthYear;

}

void Actor::setFirstName(std::string theFirstName) {
	firstName = theFirstName;

}

std::string Actor::getFirstName() {

	return firstName;


}

void Actor::setLastName(std::string theLastName) {

	lastName = theLastName;


}
std::string Actor::getLastName() {

	return lastName;


}
void Actor::setBirthYear(int theBirthYear) {

	birthYear = theBirthYear;

}
int Actor::getBirthYear() {


	return birthYear;


}