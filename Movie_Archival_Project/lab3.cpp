#include "Movie.h"

using namespace std;

void test();

int main()
{
	cout << "Start testing\n" << endl;
	test();
	cout << "\nFinished testing" << endl;
	return 0;
}

void test()
{
	Movie theMovies;

	theMovies.getMovieTitle();
	theMovies.getMovieTime();
	theMovies.getMovieYearOut();
	theMovies.getMoviePrice();
	theMovies.getNumberOfActors();
	theMovies.printMovieInfo();


	theMovies.setMovieTitle("Children of Men");
	theMovies.setMovieTime(100);
	theMovies.setMovieYearOut(2020);
	theMovies.setMoviePrice(23.99);
	theMovies.setNumberOfActors(2);
	theMovies.addActor("Halle", "Berry", 1972);
	theMovies.addActor("Robert", "Pattinson", 1984);
	theMovies.printMovieInfo();
}