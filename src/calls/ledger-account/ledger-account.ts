import { withRuntype } from '../../utils';
import * as rt from 'runtypes';
import { TripletexBase } from '../base';
import { ledgerAccountListRequest, listResponseAccountRt } from './models/list';

export class TripletexLedgerAccount extends TripletexBase {
  list() {
    const call = this.authenticatedCall()
      .args<rt.Static<typeof ledgerAccountListRequest>>()
      .path('/ledger/account')
      .method('get')
      .parseJson(withRuntype(listResponseAccountRt))
      .build();

    return this.performRequest(() => call({}));
  }
}
