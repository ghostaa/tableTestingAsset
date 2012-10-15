window.TF = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'TF_tableTF', e: 'onSelected'}]
}];
dojo.addOnLoad(function(){
  engine.registerRules(TF);
});