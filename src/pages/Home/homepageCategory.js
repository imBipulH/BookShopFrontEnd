const categoryForHomePage = [
  [
    {
      _id: '671a388af4f641f6747c61d1',
      name: 'Fiction and Sceience',
      description: 'Category for fictional and Science books.',
      parent: {
        _id: '6744d4feea5d9070886a605f',
        name: 'History'
      },
      children: [
        {
          _id: '671a545bbc5fb14b39cd8d2c',
          name: 'Love'
        },
        {
          _id: '671a545bbc5fb14b39cd8d2c',
          name: 'Love'
        },
        {
          _id: '6744d500ea5d9070886a6078',
          name: 'Action'
        },
        {
          _id: '675a00219f46af8075920020',
          name: 'Bipul'
        },
        {
          _id: '675ac569518266cf1632b9e2',
          name: 'New category 1'
        }
      ],
      createdAt: '2024-10-24T12:07:38.451Z',
      updatedAt: '2024-12-12T11:14:20.309Z',
      __v: 4
    },
    {
      _id: '671a545bbc5fb14b39cd8d2c',
      name: 'Love',
      description: 'Category for fictional books.',
      parent: {
        _id: '671a388af4f641f6747c61d1',
        name: 'Fiction and Sceience'
      },
      children: [
        {
          _id: '6744d4ffea5d9070886a606d',
          name: 'Mistery'
        }
      ],
      createdAt: '2024-10-24T14:06:19.766Z',
      updatedAt: '2024-12-12T18:33:57.012Z',
      __v: 1
    },
    {
      _id: '6744d4feea5d9070886a605f',
      name: 'History',
      parent: {
        _id: '6744d4ffea5d9070886a606d',
        name: 'Mistery'
      },
      children: [
        {
          _id: '671a388af4f641f6747c61d1',
          name: 'Fiction and Sceience'
        },
        {
          _id: '675a01259f46af8075920028',
          name: 'Romantic'
        }
      ],
      createdAt: '2024-11-25T19:50:22.958Z',
      updatedAt: '2024-12-12T18:04:22.355Z',
      __v: 0,
      description: 'This is history mistry category'
    },
    {
      _id: '6744d4ffea5d9070886a606a',
      name: 'Fiction',
      parent: {
        _id: '6744d500ea5d9070886a6078',
        name: 'Action'
      },
      children: [],
      createdAt: '2024-11-25T19:50:23.514Z',
      updatedAt: '2024-12-12T20:10:52.927Z',
      __v: 0,
      description: 'This is brief discription'
    },
    {
      _id: '6744d4ffea5d9070886a606d',
      name: 'Mistery',
      parent: {
        _id: '671a545bbc5fb14b39cd8d2c',
        name: 'Love'
      },
      children: [
        {
          _id: '6744d4feea5d9070886a605f',
          name: 'History'
        },
        {
          _id: '675a00219f46af8075920020',
          name: 'Bipul'
        }
      ],
      createdAt: '2024-11-25T19:50:23.677Z',
      updatedAt: '2024-12-13T17:33:37.969Z',
      __v: 0,
      description: 'gfdgfdgdf'
    },
    {
      _id: '6744d500ea5d9070886a6078',
      name: 'Action',
      parent: {
        _id: '671a388af4f641f6747c61d1',
        name: 'Fiction and Sceience'
      },
      children: [
        {
          _id: '675a00219f46af8075920020',
          name: 'Bipul'
        },
        {
          _id: '6744d4ffea5d9070886a606a',
          name: 'Fiction'
        }
      ],
      createdAt: '2024-11-25T19:50:24.222Z',
      updatedAt: '2024-12-12T20:10:53.097Z',
      __v: 0,
      description: 'I love action of PUSHPA'
    }
  ],
  [
    {
      _id: '675a00219f46af8075920020',
      name: 'Bipul',
      description: 'Mistry books',
      parent: {
        _id: '6744d4ffea5d9070886a606d',
        name: 'Mistery'
      },
      children: [],
      createdAt: '2024-12-11T21:12:01.944Z',
      updatedAt: '2024-12-13T17:33:37.799Z',
      __v: 0
    },
    {
      _id: '675a01259f46af8075920028',
      name: 'Romantic',
      description: 'Romatoc categpru',
      parent: {
        _id: '6744d4feea5d9070886a605f',
        name: 'History'
      },
      children: [
        {
          _id: '675ac569518266cf1632b9e2',
          name: 'New category 1'
        }
      ],
      createdAt: '2024-12-11T21:16:21.702Z',
      updatedAt: '2024-12-12T18:04:22.184Z',
      __v: 1
    },
    {
      _id: '675ac569518266cf1632b9e2',
      name: 'New category 1',
      description: 'This is brand new category. Love that.',
      parent: {
        _id: '671a388af4f641f6747c61d1',
        name: 'Fiction and Sceience'
      },
      children: [],
      createdAt: '2024-12-12T11:13:45.450Z',
      updatedAt: '2024-12-12T11:14:20.147Z',
      __v: 0
    },
    {
      _id: '675c95b562f3f53a87a6f68c',
      name: 'Programming',
      description: 'This is programming category\n',
      parent: {
        _id: '675f37da0d5aef5bceee64f9',
        name: 'CIT'
      },
      children: [],
      createdAt: '2024-12-13T20:14:45.028Z',
      updatedAt: '2024-12-15T20:11:27.509Z',
      __v: 0
    },
    {
      _id: '675f37da0d5aef5bceee64f9',
      name: 'CIT',
      description: 'This CIT Category',
      parent: null,
      children: [
        {
          _id: '675c95b562f3f53a87a6f68c',
          name: 'Programming'
        }
      ],
      createdAt: '2024-12-15T20:11:06.918Z',
      updatedAt: '2024-12-15T20:11:27.677Z',
      __v: 0
    },
    {
      _id: '67673b13ee1d2ebf4770a62e',
      name: 'Biography',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:02:59.118Z',
      updatedAt: '2024-12-21T22:02:59.118Z',
      __v: 0
    }
  ],
  [
    {
      _id: '67673c1fee1d2ebf4770a74a',
      name: 'Thriller',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:27.755Z',
      updatedAt: '2024-12-21T22:07:27.755Z',
      __v: 0
    },
    {
      _id: '67673c27ee1d2ebf4770a74f',
      name: 'Comics',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:35.189Z',
      updatedAt: '2024-12-21T22:07:35.189Z',
      __v: 0
    },
    {
      _id: '67673c33ee1d2ebf4770a754',
      name: 'Non-FIction',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:47.708Z',
      updatedAt: '2024-12-21T22:07:47.708Z',
      __v: 0
    },
    {
      _id: '67673c3bee1d2ebf4770a759',
      name: 'Fiction',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:55.708Z',
      updatedAt: '2024-12-21T22:07:55.708Z',
      __v: 0
    },
    {
      _id: '67673c3bee1d2ebf4770a759',
      name: 'Fiction',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:55.708Z',
      updatedAt: '2024-12-21T22:07:55.708Z',
      __v: 0
    },
    {
      _id: '67673c3bee1d2ebf4770a759',
      name: 'Fiction',
      parent: null,
      children: [],
      createdAt: '2024-12-21T22:07:55.708Z',
      updatedAt: '2024-12-21T22:07:55.708Z',
      __v: 0
    }
  ]
]

export default categoryForHomePage
