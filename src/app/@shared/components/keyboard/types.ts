import * as _ from "lodash";

export type KeyName =
| 'key-1'
| 'key-2'
| 'key-3'
| 'key-4'
| 'key-5'
| 'key-6'
| 'key-7'
| 'key-8'
| 'key-9'
| 'key-0'
| 'key-L'
| 'key-R'
| 'key-CNL'
| 'key-OK';

export type KeyTransformFn = (val: string) => string


/** KEY */
export type KeyOptionText = { text: string, transform?: KeyTransformFn }
export type KeyOptionIcon = { icon: string, transform?: KeyTransformFn }
export type KeyOptionTransform = { transform: KeyTransformFn }
export type KeyOption =
| KeyOptionText
| KeyOptionIcon
| KeyOptionTransform

export type KeyConfig = { isIcon: boolean, caption: string, transform: KeyTransformFn }

export type KeyboardOptions = Partial<Record<KeyName, KeyOption>>
export type Keyboard = Record<KeyName, KeyConfig>
export type KeyboardConfigs = Partial<Keyboard>


export const toKeyConfig = (keyOption: KeyOption, keyDefault: KeyConfig): KeyConfig => {
  if ('text' in keyOption) {
    const isIcon = false
    const caption = keyOption.text
    const transform = keyOption.transform || keyDefault.transform
    return { isIcon, caption, transform }
  }

  if ('icon' in keyOption) {
    const isIcon = true
    const caption = keyOption.icon
    const transform = keyOption.transform || keyDefault.transform
    return { isIcon, caption, transform }
  }

  const isIcon = false
  const caption = keyDefault.caption
  const transform = keyOption.transform
  return { isIcon, caption, transform }
}

export const toKeyboardConfig = (keyboardDefault: Keyboard, keyboardOptions: KeyboardOptions | undefined): KeyboardConfigs | undefined => {
  if (keyboardOptions === undefined) return undefined;
  const map = (keyOption: KeyOption, keyName: KeyName) => toKeyConfig(keyOption, keyboardDefault[keyName])
  return _.mapValues(keyboardOptions, map);
}

export const toKeyboard = (keyboardDefault: Keyboard, keyboardConfigs: KeyboardConfigs | undefined): Keyboard => {
  return _.merge({}, keyboardDefault, keyboardConfigs)
}




export function test() {
  // const KEYS_DEFAULT = {
  //   'key-1': { isIcon: false, caption: '1', transform: (val: string) => val + '1' },
  //   'key-2': { isIcon: false, caption: '2', transform: (val: string) => val + '2' },
  //   'key-3': { isIcon: false, caption: '3', transform: (val: string) => val + '3' },
  //   'key-4': { isIcon: false, caption: '4', transform: (val: string) => val + '4' },
  //   'key-5': { isIcon: false, caption: '5', transform: (val: string) => val + '5' },
  //   'key-6': { isIcon: false, caption: '6', transform: (val: string) => val + '6' },
  //   'key-7': { isIcon: false, caption: '7', transform: (val: string) => val + '7' },
  //   'key-8': { isIcon: false, caption: '8', transform: (val: string) => val + '8' },
  //   'key-9': { isIcon: false, caption: '9', transform: (val: string) => val + '9' },
  //   'key-0': { isIcon: false, caption: '0', transform: (val: string) => val + '0' },
  //   'key-L': { isIcon: false, caption: 'L', transform: (val: string) => val },
  //   'key-R': { isIcon: false, caption: 'R', transform: (val: string) => val },
  //   'key-CNL': { isIcon: true, caption: 'close-circle-outline', transform: (val: string) => '' },
  //   'key-OK': { isIcon: false, caption: 'OK', transform: (val: string) => val },
  // }

  // const options = {
  //   'key-1': {icon: 'abcd'}
  // }

  // const keyboardConfig = toKeyboardConfig(KEYS_DEFAULT, options)
  // console.log(toKeyboard(KEYS_DEFAULT, keyboardConfig))
  // const B = _.merge({}, KEYS_DEFAULT, undefined)

  // console.log(KEYS_DEFAULT["key-1"] === B['key-1'])
}







// import * as _ from "lodash";

// export type KeyName =
// | 'key-1'
// | 'key-2'
// | 'key-3'
// | 'key-4'
// | 'key-5'
// | 'key-6'
// | 'key-7'
// | 'key-8'
// | 'key-9'
// | 'key-0'
// | 'key-L'
// | 'key-R'
// | 'key-CNL'
// | 'key-OK';

// export type KeyTransformFn = (val: string) => string


// /** KEY */
// export type KeyOptionCaption = { caption: string, transform?: KeyTransformFn }
// export type KeyOptionIcon = { icon: string, transform?: KeyTransformFn }
// export type KeyOptionTransform = { transform: KeyTransformFn }
// export type KeyOption =
// | KeyOptionCaption
// | KeyOptionIcon
// | KeyOptionTransform

// export type KeyOptionTaggedCaption = KeyOptionCaption & { tag: 'caption' }
// export type KeyOptionTaggedIcon = KeyOptionIcon & { tag: 'icon' }
// export type KeyOptionTaggedTransform = KeyOptionTransform & { tag: 'transform' }
// export type KeyOptionTagged =
// | KeyOptionTaggedCaption
// | KeyOptionTaggedIcon
// | KeyOptionTaggedTransform

// export type KeyConfigTaggedCaption = { tag: 'caption', caption: string, transform: KeyTransformFn }
// export type KeyConfigTaggedIcon = { tag: 'icon', icon: string, transform: KeyTransformFn }
// export type KeyConfigTagged =
// | KeyConfigTaggedCaption
// | KeyConfigTaggedIcon

// export type KeyTemplate = { isIcon: boolean, text: string, transform: KeyTransformFn }

// export type KeyboardConfig = Record<KeyName, KeyConfigTagged>
// export type KeyboardOptions = Partial<Record<KeyName, KeyOption>>




// export const toKeyOptionTagged = (keyOption: KeyOption): KeyOptionTagged => {
//   if ('caption' in keyOption) return {...keyOption, tag: 'caption'};
//   if ('icon' in keyOption) return {...keyOption, tag: 'icon'}
//   return {...keyOption, tag: 'transform'}
// }

// export const toKeyConfigTagged = (keyOptionTagged: KeyOptionTagged, keyConfigTagged: KeyConfigTagged): KeyConfigTagged => {
//   switch(keyOptionTagged.tag) {
//     case 'caption':
//     {
//       const tag = keyOptionTagged.tag
//       const caption = keyOptionTagged.caption
//       const transform = keyOptionTagged.transform || keyConfigTagged.transform;
//       return { tag, caption, transform }
//     }
//     case 'icon':
//     {
//       const tag = keyOptionTagged.tag
//       const icon = keyOptionTagged.icon
//       const transform = keyOptionTagged.transform || keyConfigTagged.transform;
//       return { tag, icon, transform }
//     }
//     case 'transform': {
//       const transform = keyOptionTagged.transform;
//       if (keyConfigTagged.tag === 'caption') {
//         const tag = keyConfigTagged.tag
//         const caption = keyConfigTagged.caption
//         return {tag, caption, transform }
//       } else {
//         const tag = keyConfigTagged.tag
//         const icon = keyConfigTagged.icon
//         return {tag, icon, transform }
//       }
//     }
//   }
// }

// export const toKeyTemplate = (keyConfigTagged: KeyConfigTagged): KeyTemplate => {
//   const isIcon = keyConfigTagged.tag === 'icon';
//   const text = keyConfigTagged.tag === 'icon' ? keyConfigTagged.icon : keyConfigTagged.caption;
//   const transform = keyConfigTagged.transform;
//   return { isIcon, text, transform }
// }


// export function test() {
//   const def: KeyConfigTagged = { tag: 'icon', icon: 'aaa', transform: (val: string) => val }
//   const option: KeyOption = {icon: 'aaa'}

//   const optionTagged = toKeyOptionTagged(option)
//   console.log(toKeyConfigTagged(optionTagged, def))
// }


