import { fetchWithRetry, pickQueryValues, withRuntype } from '../../utils';
import * as rt from 'runtypes';
import { TripletexBase } from '../base';
import { ledgerAccountListRequest, listResponseAccountRt } from './models/list';

export class TripletexLedgerAccount extends TripletexBase {
  list() {
    const call = this.buildCall()
        .args<rt.Static<typeof ledgerAccountListRequest>>()
        .path('/ledger/account')
        .method('get')
        .query(
          args =>
            new URLSearchParams(
              pickQueryValues(
                args,
                'id',
                'number',
                'isBankAccount',
                'isInactive',
                'isApplicableForSupplierInvoice',
                'ledgerType',
                'isBalanceAccount',
                'from',
                'count',
                'sorting',
                'fields',
              ),
            ),
        )
        .parseJson(withRuntype(listResponseAccountRt))
        .build()
    return fetchWithRetry(call);
  }
}
