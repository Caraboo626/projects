
import java.util.Arrays;


public class PlayGame {
	int [] solitaire (int [] pileArray) {
	
		
		int sum;
		for (int i = 0; i < pileArray.length; i++) {
			Arrays.sort(pileArray);
			sum = pileArray[i] - 1;
			sum++;
		}
		
		sum = pileArray[pileArray.length - 1];
		
		
		
		
		return pileArray;
		
	}
}
