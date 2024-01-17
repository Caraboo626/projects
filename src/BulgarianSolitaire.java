import java.util.Arrays;
import java.util.Collections;

 

/*
/ * Name: Cara Failer
 * Date: 11/27/2020
 * Professor: Zareh Gorjian
 * Project Title: Bulgarian Solitaire
 * 
 *  This program simulates Bulgarian Solitaire which will distribute
 *  45 cards into separate indices to create a triangle effect. 
 */


public class BulgarianSolitaire {
	

	public static void main(String[] args) {
		
		// ArrayList that holds card piles
		int [] cardTrick = new int [45];
		
		Piles getPile = new Piles();
		RemoveZeros removeZeros = new RemoveZeros();
		PlayGame solitaireTime = new PlayGame();
		CompareDecks winningDeck = new CompareDecks();
		
		// splits 45 into random piles and put them in arrayList
		for (int i = 0; i < cardTrick.length - 1; i++) {
			getPile.sortPiles(cardTrick);
			removeZeros.noZeros(cardTrick);
			reverse(cardTrick);
			System.out.println(solitaireTime.solitaire(cardTrick));
			if (winningDeck.didIWin(cardTrick) == true) {
				break;
			}
		}
			

	}

	private static int[] reverse(int[] cardTrick) {
		// reverses the array to descending order
		int [] reverseArray = new int [cardTrick.length];
		
		for (int i = 0, j = reverseArray.length; i < cardTrick.length; i++, j--) {
			reverseArray[j] = cardTrick[i];
		}
		
		return reverseArray;
	}
	
}

