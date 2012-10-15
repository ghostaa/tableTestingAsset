package com.ibm.btt.application.op;


import com.ibm.btt.base.DSEInvalidArgumentException;
import com.ibm.btt.base.DSEObjectNotFoundException;
import com.ibm.btt.base.IndexedCollection;

public class AccountListDB
{
	private static IndexedCollection allAccountList = null;
	private final static int rowsPerPage = 10;
	private static int totalNum = 0;
	private static int totalPage = 0;
	
	private AccountListDB(IndexedCollection accountInfoList)
	{
		allAccountList = accountInfoList;
	}
	
	public synchronized static void saveAccountList(IndexedCollection accountInfoList, int pageNum) throws Exception
	{
		int num = rowsPerPage;
		
		if(pageNum == totalPage)
			num = totalNum - totalPage*rowsPerPage;
		
		// init a new DB
		for(int i = 0; i < num; i ++)
		{
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountName", accountInfoList.getValueAt(i + ".AccountName"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".TradeTime", accountInfoList.getValueAt(i + ".TradeTime"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountType", accountInfoList.getValueAt(i + ".AccountType"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountBlance", accountInfoList.getValueAt(i + ".AccountBlance"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".MaximumAmount", accountInfoList.getValueAt(i + ".MaximumAmount"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountOpeningDate", accountInfoList.getValueAt(i + ".AccountOpeningDate"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".Rate", accountInfoList.getValueAt(i + ".Rate"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".Localtion", accountInfoList.getValueAt(i + ".Localtion"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".Usable", accountInfoList.getValueAt(i + ".Usable"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".accountAttribution", accountInfoList.getValueAt(i + ".accountAttribution"));
			allAccountList.setValueAt(((pageNum-1)*rowsPerPage + i) + ".ImageField", accountInfoList.getValueAt(i + ".ImageField"));
		}
	}
	
	public synchronized static void getAllAccountList(int pageNum, IndexedCollection accountInfoList) throws DSEObjectNotFoundException, DSEInvalidArgumentException
	{		
		int num = rowsPerPage;
		
		if(pageNum == totalPage)
			num = totalNum - (totalPage-1)*rowsPerPage;

		//---------------------------------------------------for change
		for(int i = 0; i < num; i ++)
		{
			accountInfoList.setValueAt(i + ".AccountName", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountName"));
			accountInfoList.setValueAt(i + ".TradeTime", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".TradeTime"));
			accountInfoList.setValueAt(i + ".AccountType", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountType"));
			accountInfoList.setValueAt(i + ".AccountBlance", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountBlance"));
			accountInfoList.setValueAt(i + ".MaximumAmount", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".MaximumAmount"));
			accountInfoList.setValueAt(i + ".AccountOpeningDate", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".AccountOpeningDate"));
			accountInfoList.setValueAt(i + ".Rate", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".Rate"));
			accountInfoList.setValueAt(i + ".Localtion", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".Localtion"));
			accountInfoList.setValueAt(i + ".Usable", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".Usable"));
			accountInfoList.setValueAt(i + ".accountAttribution", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".accountAttribution"));
			accountInfoList.setValueAt(i + ".ImageField", allAccountList.getValueAt(((pageNum-1)*rowsPerPage + i) + ".ImageField"));
		}
	}
	
	public synchronized static IndexedCollection getAllAccountList(IndexedCollection accountInfoList)
	{
		if(allAccountList == null)
		{
			totalNum = accountInfoList.size();
			totalPage = accountInfoList.size()/rowsPerPage;
			if(accountInfoList.size()%rowsPerPage > 0)
				totalPage ++;
			
			return new AccountListDB(accountInfoList).allAccountList;
		}
		
		return allAccountList;
	}
}