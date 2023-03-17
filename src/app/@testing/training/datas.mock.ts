

interface UserData {
	username: string,
}

interface MultipleData {
	f1: number,
	f2: number,
	successes: number,
	fails: number
}

interface TrainingData {
	completed: boolean,
	successRequired: number,
	multiples: MultipleData[]
}


export const MockDatas = {
	users: {
		"user1": {
			username: "aaa",
			trainings: {
				"training1": {
					completed: false,
					successRequired: 2,
					multiples: [
						{
							f1: 3,
							f2: 4,
							successes: 1,
							fails: 4
						}
					]
				}
			}
		}
	}
}



// export const MockDatas_fbDb = {
//   state: {},
//   users: {},
//   trainings: {
//     user1: {
//       training1: {},
//     },
//   },
//   multiples: {
//     user1: {
//       training1: {
//         multiple1: {},
//       },
//     },
//   },
// };


// type MockDatasFbFs = {
// 	users: {
// 		[key:string]: {
// 			email: string,
// 			password: string
// 		}
// 	},
// 	trainings: {
// 		[key:string]: {
// 			users: {
// 				[key:string]: {
// 					successRequired: number,
// 					multiples: {
// 						[key:string]: {
// 							f1: number,
// 							f2: number,
// 							successes: number,
// 							fails: number
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }


// export const MockDatas_fbFs: MockDatasFbFs = {
// 	users: {
// 		"user1": {
// 			email: "aaa@ite-multiplication.com",
// 			password: "111111"
// 		}
// 	},
//   trainings: {
//     "training1": {
//       users: {
//         "user1": {
//           successRequired: 2,
//           multiples: {
//             "multiple1": {
//               f1: 2,
//               f2: 3,
//               successes: 1,
//               fails: 5,
//             },
//           },
//         },
//       },
//     },
//   },
// };
