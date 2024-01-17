import java.util.Random;

public class Piles {
	
	// sort 45 into random piles in an array
	public int [] sortPiles(int[] pileArray) {
		int sum = 0;
		Random rand = new Random();
		if (sum <= 45) {
			for(int i = 0; i < pileArray.length - 1; i++) {
				int newPile = rand.nextInt((45 - i));
				pileArray[i] = newPile;
				sum += newPile;
			}
		}
		return pileArray;
	}
	
}
