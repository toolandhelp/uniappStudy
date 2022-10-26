import {
	getAPIUrlByEnum
} from '@/share/http/serveUrl.js'
import productEnum from "../../service/enumeration/productEnum";
class ConfirmEntity {
	static keyValues = [{
			key: 100,
			url: '/Bill/RequestDraw/Confirm',
			product: productEnum.asset
		},
		{
			key: 101,
			url: '/Bill/Draw/Confirm',
			product: productEnum.asset
		},
		{
			key: 102,
			url: '/Bill/DrawBack/Confirm',
			product: productEnum.asset
		},
		{
			key: 103,
			url: '/Bill/Transform/Confirm',
			product: productEnum.asset
		},
		{
			key: 104,
			url: '/Bill/Borrow/Confirm',
			product: productEnum.asset
		},
		{
			key: 105,
			url: '/Bill/Return/Confirm',
			product: productEnum.asset
		},
		{
			key: 106,
			url: '/Bill/RequestDiscard/Confirm',
			product: productEnum.asset
		},
		{
			key: 107,
			url: '/Bill/Discard/Confirm',
			product: productEnum.asset
		},
		{
			key: 108,
			url: '/Bill/PurchasingApplication/Confirm',
			product: productEnum.asset
		},
		{
			key: 109,
			url: '/Bill/PurchasingOrder/Confirm',
			product: productEnum.asset
		},
		{
			key: 110,
			url: '/Bill/PurchasingAccept/Confirm',
			product: productEnum.asset
		},
		{
			key: 111,
			url: '/Bill/PurchasingReturn/Confirm',
			product: productEnum.asset
		},
		{
			key: 112,
			url: '/Bill/AssetInWarehouse/Confirm',
			product: productEnum.asset
		},
		{
			key: 200,
			url: '/Bill/InWarehouse/Confirm',
			product: productEnum.consumable
		},
		{
			key: 201,
			url: '/Bill/OutWarehouse/Confirm',
			product: productEnum.consumable
		},
		{
			key: 202,
			url: '/Bill/Discard/Confirm',
			product: productEnum.consumable
		},
		{
			key: 203,
			url: '/Bill/Allocate/Confirm',
			product: productEnum.consumable
		},
		{
			key: 204,
			url: '/Bill/PurchasingApplication/Confirm',
			product: productEnum.consumable
		},
		{
			key: 205,
			url: '/Bill/PurchasingOrder/Confirm',
			product: productEnum.consumable
		},
		{
			key: 206,
			url: '/Bill/PurchasingReturn/Confirm',
			product: productEnum.consumable
		},
		{
			key: 207,
			url: '/Bill/RequestDraw/Confirm',
			product: productEnum.consumable
		},
		{
			key: 208,
			url: '/Bill/TransferOut/Confirm',
			product: productEnum.consumable
		},
		{
			key: 209,
			url: '/Bill/TransferIn/Confirm',
			product: productEnum.consumable
		},
		{
			key: 210,
			url: '/Bill/OriginalAmountAlteration/Confirm',
			product: productEnum.asset
		},

		{
			key: 211,
			url: '/Bill/Project/Confirm',
			product: productEnum.OBPProject
		},
		{
			key: 212,
			url: '/Bill/Contract/Confirm',
			product: productEnum.OBPProject
		},
		{
			key: 213,
			url: '/Bill/Convert/Confirm',
			product: productEnum.OBPProject
		},
		{
			key: 214,
			url: '/Bill/CancelRequestDiscard/Confirm',
			product: productEnum.OBPProject
		},
		{
			key: 215,
			url: '/Bill/Split/Confirm',
			product: productEnum.OBPProject
		},


	];
	static filePath = '/Attachment/Upload';
	
}
export function GetFullUrlByKey(key) {
	let target = ConfirmEntity.keyValues.filter(t => {
		return t.key == key;
	})[0];
	let product = target.product;

	let service = getAPIUrlByEnum(product, target.url);

	return service;
}

export function GetUploadFilePath() {
	return getAPIUrlByEnum(productEnum.asset, ConfirmEntity.filePath);
}

export function GetSignPath(filePath) {
	return getAPIUrlByEnum(productEnum.system, filePath);
}