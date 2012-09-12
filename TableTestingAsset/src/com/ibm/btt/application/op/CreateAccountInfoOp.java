package com.ibm.btt.application.op;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Random;

import com.ibm.btt.automaton.ext.DSEOperationState;
import com.ibm.btt.base.BTTServerOperation;
import com.ibm.btt.base.IndexedCollection;
import com.ibm.btt.base.KeyedCollection;
import com.ibm.btt.base.OperationRepliedEvent;
import com.ibm.btt.base.types.impl.Currency;
/** 
 * Class Generated by BTT Tool
 * Created since: 2012/09/10 14:39:01
 */
public class CreateAccountInfoOp extends BTTServerOperation {
	private Random rand = new Random();
  /** 
 * <!-- begin-user-doc -->
 * <!-- end-user-doc -->
 */
  public void execute() throws Exception {
	  	System.out.println("CreateAccountInfoOp + execute");
		

		KeyedCollection opData = this.getContext().getKeyedCollection();
		IndexedCollection accountTable = (IndexedCollection) opData
				.getElementAt("AccountInfoList");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		//set value
		for (int i = 0; i < accountTable.size(); i++) {
			accountTable.setValueAt(i + ".AccountName", "Helen" + i);
			accountTable.setValueAt(i + ".TradeTime", rand.nextInt(10));
			accountTable.setValueAt(i + ".AccountBlance", new Currency("USD",
					new BigDecimal(rand.nextInt(99999999))));
			accountTable.setValueAt(i+".MaximumAmount",new BigDecimal(rand.nextDouble()*1000000000));
			int month = (int)(Math.random()*11 + 1);
			int day = (int)(Math.random()*27 + 1);
			String dateString = "2012-"+month+"-"+day;
			
			accountTable.setValueAt(i+".AccountOpeningDate",sdf.parse(dateString));
			accountTable.setValueAt(i+".Rate",rand.nextDouble());
			accountTable.setValueAt(i+".Usable",rand.nextBoolean());
		}
		OperationRepliedEvent event = new OperationRepliedEvent(this);
		com.ibm.btt.base.Hashtable ht = new com.ibm.btt.base.Hashtable();
		ht.put(DSEOperationState.EXIT_EVENT_NAME, "ShowAccountInfo");
		event.setParameters(ht);
		fireHandleOperationRepliedEvent(event);

		System.out.println(this.getContext().getKeyedCollection());
  }
}