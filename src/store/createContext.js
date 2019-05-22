import React from 'react';

// const TestContext = React.createContext();

// function TestContextProvier(props) {
//   const [count, setCount] = React.useState(0);
//   const value = React.useMemo(() => {
//     return {
//       count,
//       setCount,
//     };
//   }, [count]);
//   return <TestContext.Provider value={value} {...props} />;
// }

// function useCount() {
//   const context = React.useContext(TestContext);
//   if (!context) {
//     throw new Error('useCount must be used within a CountProvider');
//   }
//   const { count, setCount } = context;
//   const increment = React.useCallback(() => setCount(c => c + 1), [setCount]);

//   return {
//     count,
//     increment,
//   };
// }

const { Provider, Consumer } = React.createContext();

export { Provider, Consumer };
