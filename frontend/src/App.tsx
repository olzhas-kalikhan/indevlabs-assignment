import TodoList from "./components/todo-list";
import QueryClientProvider from "./query-client-provider";

function App() {
  return (
    <QueryClientProvider>
      <main className="m-auto container">
        <TodoList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
