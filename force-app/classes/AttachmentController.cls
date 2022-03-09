public without sharing class AttachmentController {
    
	@AuraEnabled
    public static void CreateContentDocumentLink(Case newCase, List<String> documents) {
        
        //ケース登録
        insert newCase;
        //紐づけオブジェクト宣言
        List<ContentDocumentLink> newLinks = new List<ContentDocumentLink>();
        
        //添付ファイル分ループ
        for(String docverId : documents) {
            
            //ContentVersionIdを元に、CondentDocumentIdを取得
            ContentVersion cv = [SELECT Id,ContentDocumentId FROM ContentVersion WHERE Id =:docverId];
            
            ContentDocumentLink newLink = new ContentDocumentLink(
                ContentDocumentId = cv.ContentDocumentId,
                LinkedEntityId = newCase.Id, //発番されたケースID
                Visibility = 'AllUsers',	//要検討
                ShareType = 'v'                    
            );
            newLinks.add(newLink);
        }
        
        //紐づけオブジェクト挿入
        insert newLinks;           
    }
}