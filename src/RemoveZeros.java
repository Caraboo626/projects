

public class RemoveZeros {
	
	public int[] noZeros(int [] cardArray) {
		int [] decoyArray = new int[cardArray.length - 1];
		for (int i = 0, j = 0; i < cardArray.length - 1; i++) {
			if(cardArray[i] != 0) {
				cardArray[j++] = decoyArray[i];
			}
		}
		
		
		return cardArray;
		
	}
}
