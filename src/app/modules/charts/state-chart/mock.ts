export const WORK_MASTER = [
  {
    version: '03',
    work: 'ganclip',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'none',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'none',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'suachualr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'duoc_chap_nhan',
        properties: []
      }
    ],
    id: 'ganclip-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_ganclip'
  },
  {
    version: '03',
    work: 'ganpr',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'ganclip-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'ganpr-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_ganpr'
  },
  {
    version: '03',
    work: 'kichthuocngoaiquan',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'ganpr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'kichthuocngoaiquan-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_kichthuoc_ngoaiquan'
  },
  {
    version: '03',
    work: 'kiemdien',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'kichthuocngoaiquan-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'kiemdien-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_dandien'
  },
  {
    version: '03',
    work: 'option',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'kiemdien-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'option-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_option'
  },
  {
    version: '03',
    work: 'suachualr',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'suachualr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'khong_duyet_lap_rap',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'suachualr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'khong_duoc_chap_nhan',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'suachuatm-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'duyet_to_may',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'ganclip-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'ganpr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'kichthuocngoaiquan-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'kiemdien-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'option-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'thanhpham-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'thanhphamdongthung-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      }
    ],
    id: 'suachualr-81306FL062_03',
    type: 'master'
  },
  {
    version: '03',
    work: 'suachuatm',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'suachualr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'khong_duoc_chap_nhan',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'suachuatm-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'khong_duyet_to_may',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'ganclip-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'ganpr-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'kiemdien-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'kichthuocngoaiquan-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'option-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'thanhpham-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      },
      {
        uom: 'pcs',
        lastWork: 'thanhphamdongthung-81306FL062_03',
        quantity: 1,
        use: 'inspected',
        definition: '81306FL062_03',
        lastStatus: 'dang_cho_sua',
        properties: []
      }
    ],
    id: 'suachuatm-81306FL062_03',
    type: 'master'
  },
  {
    version: '03',
    work: 'thanhpham',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'option-81306FL062_03',
        quantity: 1,
        use: 'packed',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'thanhpham-81306FL062_03',
    type: 'master'
  },
  {
    version: '03',
    work: 'thanhphamdongthung',
    uom: 'second',
    parameterSpecs: [],
    personnelSpecs: [],
    scopeSpecs: [],
    physicalAssetSpecs: [],
    materialSpecs: [
      {
        uom: 'pcs',
        lastWork: 'thanhpham-81306FL062_03',
        quantity: 1,
        use: 'packed',
        definition: '81306FL062_03',
        lastStatus: 'dang_kiem_tra',
        properties: []
      }
    ],
    id: 'thanhphamdongthung-81306FL062_03',
    type: 'master',
    testSpecification: 'mts_thanhpham_dongthung'
  }
];
