import React, { Suspense } from 'react';
import './App.css';
import Spinner from './Components/Spinner/Spinner';

const Todo = React.lazy(() => import('./todo/todo'));
//import Todo from './todo/todo'; is lazy loaded

function App() {
  return (
    <div >
      <header className="App-header">
        <h1 className="App">Todos</h1>
        <Suspense fallback={<Spinner />}>
        <section>
          <Todo />
        </section>
        </Suspense>
      </header>
    </div>
  );
}

export default App;
