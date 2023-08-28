namespace my.GateEntryPO;

entity PoList {
  key Po_Number       : String(10);
      Material_Master : Association to many MaterialMaster
                          on Material_Master.Po_Number = $self;
}

entity MaterialMaster {
  key Po_Number      : Association to one PoList;
  key Matnr          : String(40);
      Maktx          : String;
      Lifnr          : String(10);
      Werks          : String(6);
      Vendor         : String;
      Plant          : String;
      District       : String;
      Quantity       : Int32;
      BilledQuantity : Int32;
      Uom            : String(10);
      GateEntry      : Association to many GateEntry
                         on GateEntry.Matnr = $self;
}

entity GateEntry {
  key Matnr        : Association to one MaterialMaster;
      Mode         : String(10);
      EwayBill     : String(12);
      EwayBillDate : String;
      EtaDate      : String;
      EtaTime      : String;
      Transporter  : String;
      Driver       : String;
      Contact      : String(11);
      RegNum       : String;
      Remarks      : String;
}
