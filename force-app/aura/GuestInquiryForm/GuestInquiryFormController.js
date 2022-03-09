({
    //■■アップロード後処理
    onUploadFinished: function (component, event, helper) {
        
        var uploadedFiles = event.getParam("files");  

        //ファイル-レコード紐付け用
        var documentVersionIds = component.get("v.documents");
        uploadedFiles.forEach(element => documentVersionIds.push(element.contentVersionId));
        component.set("v.documents", documentVersionIds);
    
        //画面表示用ファイル名リスト追加    
		var filenames = component.get("v.filenames"); 
		uploadedFiles.forEach(element => filenames.push("・"+element.name));
        component.set("v.filenames", filenames);
    },

    //■■登録時処理
    SubmitCase : function(component, event, helper) {
        
        var action = component.get("c.CreateContentDocumentLink");
        
        action.setParams ({
            documents : component.get("v.documents"),	//アップロードファイルリスト
            newCase : component.get("v.newCase")		//ケースオブジェクト
        });

        action.setCallback(this, function(response) {
            
            var state = response.getState();
            
            if (state==="SUCCESS") {
                //aura:ifのフラグ設定、正常終了メッセージを表示
                component.set("v.isComplete", "true");
            }
            else {
                let errors = response.getError();
                let message = 'エラーが発生しました';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error(message);
            }
        });
        $A.enqueueAction(action);
    }

})