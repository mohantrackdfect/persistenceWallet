import Axios from 'axios';
import {getSendTransactionsUrl, getReceiveTransactionsUrl} from "../constants/url";
import {
    PAGE_NUMBER_FETCH_SUCCESS,
    TRANSACTIONS_FETCH_ERROR,
    TRANSACTIONS_FETCH_SUCCESS,
    TRANSACTIONS_IN_PROGRESS,
    RECEIVE_PAGE_NUMBER_FETCH_SUCCESS,
    RECEIVE_TRANSACTIONS_FETCH_ERROR,
    RECEIVE_TRANSACTIONS_FETCH_SUCCESS,
    RECEIVE_TRANSACTIONS_IN_PROGRESS
} from "../constants/transactions";


export const fetchTransactionsProgress = () => {
    return {
        type: TRANSACTIONS_IN_PROGRESS,
    };
};

export const fetchPageNumberSuccess = (number, totalPages) => {
    return {
        type: PAGE_NUMBER_FETCH_SUCCESS,
        number,
        totalPages
    };
};


export const fetchTransactionsSuccess = (list) => {
    return {
        type: TRANSACTIONS_FETCH_SUCCESS,
        list,
    };
};
export const fetchTransactionsError = (list) => {
    return {
        type: TRANSACTIONS_FETCH_ERROR,
        list,
    };
};

export const fetchTransactions = (address, limit, pageNumber) => {

    return async dispatch => {
        dispatch(fetchTransactionsProgress());
        const url = getSendTransactionsUrl(address, limit, pageNumber);

        const result = await Axios.get(url).catch((error) => {
            dispatch(fetchTransactionsError(error.response
                ? error.response.data.message
                : error.message));
        });
        if(result !== undefined) {
            let txnsResponseList = result.data.tx_responses;
            dispatch(fetchPageNumberSuccess(pageNumber, result.data.pagination.total));
            dispatch(fetchTransactionsSuccess(txnsResponseList));
        }
    };
};

export const fetchReceiveTransactionsProgress = () => {
    return {
        type: RECEIVE_TRANSACTIONS_IN_PROGRESS,
    };
};

export const fetchReceivePageNumberSuccess = (number, totalPages) => {
    return {
        type: RECEIVE_PAGE_NUMBER_FETCH_SUCCESS,
        number,
        totalPages
    };
};


export const fetchReceiveTransactionsSuccess = (list) => {
    return {
        type: RECEIVE_TRANSACTIONS_FETCH_SUCCESS,
        list,
    };
};
export const fetchReceiveTransactionsError = (list) => {
    return {
        type: RECEIVE_TRANSACTIONS_FETCH_ERROR,
        list,
    };
};


export const fetchReceiveTransactions = (address, limit, pageNumber) => {
    return async dispatch => {
        dispatch(fetchReceiveTransactionsProgress());
        const url = getReceiveTransactionsUrl(address, limit, pageNumber);
        const result = await Axios.get(url).catch((error) => {
            dispatch(fetchReceiveTransactionsError(error.response
                ? error.response.data.message
                : error.message));
        });
        if(result !== undefined){

            let txnsResponseList = result.data.tx_responses;
            dispatch(fetchReceivePageNumberSuccess(pageNumber, result.data.pagination.total));
            dispatch(fetchReceiveTransactionsSuccess(txnsResponseList));
        }
    };
};
