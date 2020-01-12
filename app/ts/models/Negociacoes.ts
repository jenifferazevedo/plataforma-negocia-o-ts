import { Negociacao } from './Negociacao';
import { logarTempoDeExecucao } from '../helpers/decorators/index';
export class Negociacoes {
  private _negociacoes: Negociacao[] = [];
  
  adiciona(negociacao: Negociacao) {
    this._negociacoes.push(negociacao);
  }
  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }
}