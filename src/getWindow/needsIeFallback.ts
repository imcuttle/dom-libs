// this is a browser-only module. There is a non-browser equivalent in the same
// directory. This is done using a `package.json` browser field.
// old-IE fallback logic: http://stackoverflow.com/a/10260692
export default typeof document === 'undefined' || typeof window === 'undefined'
  ? false
  : // @ts-ignore
    !!document.attachEvent && window !== document.parentWindow
