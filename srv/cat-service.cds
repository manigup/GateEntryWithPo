using my.GateEntryPO as db from '../db/data-model';

service CatalogService {

    type object {};

    @readonly
    entity PoList        as projection on db.PoList;

    @readonly
    entity MaterialList  as projection on db.MaterialMaster;

    entity GateEntryList as projection on db.GateEntry;
}
