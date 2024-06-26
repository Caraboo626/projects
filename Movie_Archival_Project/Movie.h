#pragma once
#ifndef MOVIE_H_
#define MOVIE_H_

#include "Actor.h"

class Movie {
private:
	int movieTime;
	int movieYearOut;
	int numberOfActors;
	int actorArrayIndex;
	double moviePrice;
	std::string movieTitle;
public:
	Actor* actors;
	Movie();
	Movie(int, int, int, double, std::string);
	Movie(const Movie& m);
	~Movie();
	void setMovieTime(int);
	int getMovieTime();
	void setMovieYearOut(int);
	int getMovieYearOut();
	void setNumberOfActors(int);
	int getNumberOfActors();
	void addActor(std::string, std::string, int);
	void setMoviePrice(double);
	double getMoviePrice();
	void setMovieTitle(std::string);
	std::string getMovieTitle();
	void printMovieInfo();
};

#endif /* MOVIE_H_ */
