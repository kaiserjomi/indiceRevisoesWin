FichasLista = new Meteor.Collection('fichas');
Revisoes = new Meteor.Collection('revisoes');


if (Meteor.isClient) 
{

Template.removeFicha.events({

  'click .remove': function(){
    //define a var selectedPlayer como sendo a session que tem o ID do player
    var selectedItem = Session.get('selectedItem');
    console.log("click session: " + selectedItem);
    Meteor.call('removerDadosFicha', selectedItem);
    }
});



Template.editFicha.events({

  'submit form': function(event){
    event.preventDefault();
    var itemSelecionado = Session.get('selectedItem');
    var editMatriculaVar = event.target.editMatricula.value;
    var editMarcaVar = event.target.editMarca.value;
    var editModeloVar = event.target.editModelo.value;
    var editAnoVar = parseInt(event.target.editAno.value);
    Meteor.call('editarDadosFicha', itemSelecionado, editMatriculaVar, editMarcaVar, editModeloVar, editAnoVar);
    }
});


Template.addFicha.events({
 
  'submit form': function(event){
    //para impedir que faça refresh
    event.preventDefault();
    var fichaMatriculaVar = event.target.fichaMatricula.value;
    var fichaMarcaVar = event.target.fichaMarca.value;
    var fichaModeloVar = event.target.fichaModelo.value;
    var fichaAnoVar = parseInt(event.target.fichaAno.value);
    var fichaCriadoVar = event.target.fichaCriado.value;

  console.log(fichaMatriculaVar);
  console.log(fichaMarcaVar);
  console.log(fichaModeloVar);
  console.log(fichaAnoVar);
  console.log(fichaCriadoVar);

    Meteor.call('inserirDadosFicha',fichaMatriculaVar, fichaMarcaVar, fichaModeloVar, fichaAnoVar, fichaCriadoVar );

    event.target.fichaMatricula.value = "";
    event.target.fichaMarca.value = "";
    event.target.fichaModelo.value = "";
    event.target.fichaAno.value = "";
 
  }
}); 


//Eventos são acções que o utilizador pode realizar no template
Template.indiceRevisoes.events({

  'click .item': function(){
    var itemId = this._id
    Session.set('selectedItem', itemId);
    var itemSelecionado = Session.get('selectedItem');
    console.log("session: " + itemSelecionado);
  },

  'submit form': function(event)
  {
    event.preventDefault();
  
  },
});


//Helpers são funções para ajudar a fazer funções no template
Template.indiceRevisoes.helpers(
{
  'ficha': function()
  {
   return FichasLista.find({}, {sort: {matricula: 1} })
  },

  //Helper para determinar o item que tenho selecionado
  'itemSelecionado': function()
  {
    var itemId = this._id;
    var itemSelecionado = Session.get('selectedItem');
    if(itemId == itemSelecionado){
      return "selecionado"
    }
   },

   /*'data': function()
   {
    var itemData = new Date();  //create a new date with current date and time
    itemData.toLocaleDateString();
    return itemData;
   }
   */

});


Template.addRevisao.events({
 
  //event que é acionado quando carregamos no botão submit
  'submit form': function(event){

    //para impedir que faça refresh
    event.preventDefault();
    var itemSelecionado = Session.get('selectedItem');
    console.log(event.target);

    //aqui estou a atribuir valores ás variaveis
    var kilometrosVar = parseInt(event.target.kilometros.value);
    var listaRepararVar = [].slice.apply(document.querySelectorAll("input[type=checkbox]"))
           .filter(function(c){ return c.checked; })
           .map(function(c){ return c.value; });

  //var idReparacaoVar = event.target._id.value;
  
//depois vou chamar o inserirDadosRevisao que se encontra no lado servidor
Meteor.call('inserirDadosRevisao', itemSelecionado, kilometrosVar,listaRepararVar);
    
  },

}); 



Template.listaRevisoes.helpers({
 
  'revisao': function(){
    var itemSelecionado = Session.get('selectedItem');
    var a = Revisoes.find({idFicha: itemSelecionado});
    return a;
  },

  'periodo': function(){
    return moment(this.data).fromNow();
  },
    /*
  'revisto': function(){
  var revisao = return Revisoes.find({idFicha: itemSelecionado});
  for (i = 0; i > revisao.length; i++) { 
    return reparado[i];
  }
  },*/
}); 


Template.removeRevisao.events({

  'click .remove': function(){
    //define a var selectedRevisao como sendo a session que tem o ID da revisao
    var selectedRevisao= this._id;
    Meteor.call('removerDadosRevisao', selectedRevisao);
    }
});

  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}