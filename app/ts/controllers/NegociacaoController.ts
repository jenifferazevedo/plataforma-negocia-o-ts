import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {
  @domInject('#data')
  private _inputData: JQuery;
  @domInject('#quantidade')
  private _inputQuantidade: JQuery;
  @domInject('#valor')
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');
  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }
  adiciona(event: Event) {
    event.preventDefault();
    let data = new Date(this._inputData.val().replace(/-/g, ','));
    if(!this._diaUtil(data)) {
      this._mensagemView.update('Somente negociações em dias úteis, por favor!')
      return
    }
		const negociacao = new Negociacao (
      data,
			parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val()));
      
      this._negociacoes.adiciona(negociacao);
      this._negociacoes.paraArray();
      this._negociacoesView.update(this._negociacoes);
      this._mensagemView.update('Negociação adicionada com sucesso!');
      this._limparFormulario();
      console.log(negociacao);
  }
  private _limparFormulario() {
    this._inputData.val('');
    this._inputQuantidade.val(1);
    //tenho que fazer aparecer o 0.0 porque aparece só o 0
    this._inputValor.val(0.0);
    this._inputData.focus();
  }
  private _diaUtil(data: Date) {
    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
  }
}
enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}