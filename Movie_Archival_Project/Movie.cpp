#include "Movie.h"

using namespace std;

Movie::Movie() {
	
	
	this->movieTime = 0;
	this->movieYearOut = 1900;
	this->numberOfActors = 10;
	this->actorArrayIndex = 0;
	this->moviePrice = 1.00;
	this->movieTitle = "Dances with Wolves";
	actors = new Actor[numberOfActors];

}
Movie::Movie(int aDuration, int theReleaseYear, int numActors, double thePrice, std::string theTitle) {
	
	movieTime = aDuration;
	movieYearOut = theReleaseYear;
	numberOfActors = numActors;
	actorArrayIndex = 0;
	moviePrice = thePrice;
	movieTitle = theTitle;
	actors = new Actor[numberOfActors];
}


Movie::Movie(const Movie& m) {
	movieTime = m.movieTime;
	movieYearOut = m.movieYearOut;
	numberOfActors = m.numberOfActors;
	moviePrice = m.moviePrice;
	movieTitle = m.movieTitle;
	actors = new Actor[numberOfActors];
	for (int i = 0; i < numberOfActors; i++)
	{
		addActor(m.actors->getFirstName(), m.actors->getLastName(), m.actors->getBirthYear());
	}
}


Movie::~Movie() {
	delete[] actors;

}
void Movie::setMovieTime(int aMovieTime) {

	movieTime = aMovieTime;

}
int Movie::getMovieTime() {

	return movieTime;

}
void Movie::setMovieYearOut(int aMovieYearOut) {

	movieYearOut = aMovieYearOut;

}
int Movie::getMovieYearOut() {

	return movieYearOut;

}
void Movie::setNumberOfActors(int aNumberofActors) {

	numberOfActors = aNumberofActors;

}
int Movie::getNumberOfActors() {


	return numberOfActors;

}


void Movie::addActor(std::string theFirstName, std::string theLastName, int theYearOfBirth) {
	
		this->actors[actorArrayIndex].setFirstName(theFirstName);
		this->actors[actorArrayIndex].setLastName(theLastName);
		this->actors[actorArrayIndex].setBirthYear(theYearOfBirth);

	actorArrayIndex++;

}
void Movie::setMoviePrice(double aMoviePrice) {

	moviePrice = aMoviePrice;

}
double Movie::getMoviePrice() {


	return moviePrice;

}
void Movie::setMovieTitle(std::string aMovieTitle) {

	movieTitle = aMovieTitle;


}
std::string Movie::getMovieTitle() {


	return movieTitle;

}
void Movie::printMovieInfo() { 

	std::cout << "Title: " << getMovieTitle()
		<< ", Published in: " << getMovieYearOut() << '\n'
		<< "Duration of Movie: " << getMovieTime() << " minutes\n"
		<< "Price: $" << getMoviePrice() << '\n'
		<< "Actors:" << endl;
	for (int i = 0; i < actorArrayIndex; i++)
	{
		cout << this->actors[i].getFirstName() << " "
			<< this->actors[i].getLastName() << ", "
			<< this->actors[i].getBirthYear() << endl;
	}
	 
		
		

}