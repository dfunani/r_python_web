/** Canonical examples for docs, playground, and homepage. */

export type ExampleStatus = "working" | "partial" | "roadmap";

export type ExampleCategory =
  | "basics"
  | "control-flow"
  | "types"
  | "oop"
  | "stdlib"
  | "network"
  | "interop"
  | "compiler";

export type RpyExample = {
  id: string;
  title: string;
  filename: string;
  category: ExampleCategory;
  status: ExampleStatus;
  summary: string;
  source: string;
  expectedOutput?: string;
  tags?: string[];
};

export const EXAMPLE_CATEGORY_LABELS: Record<ExampleCategory, string> = {
  basics: "Basics",
  "control-flow": "Control flow",
  types: "Types & functions",
  oop: "Classes, structs & interfaces",
  stdlib: "Standard library",
  network: "HTTP & networking",
  interop: "FFI & extern",
  compiler: "Compiler introspection",
};

export const EXAMPLE_STATUS_LABELS: Record<ExampleStatus, string> = {
  working: "Runs on v2.0",
  partial: "Partial support",
  roadmap: "Roadmap / sketch",
};

export const RPY_EXAMPLES: RpyExample[] = [
  {
    id: "hello",
    title: "Hello, rPython",
    filename: "hello.rpy",
    category: "basics",
    status: "working",
    summary: "Minimal program — print, return, and the default entrypoint.",
    tags: ["print", "main"],
    source: `def main() -> int:
    print("hello, rPython")
    return 0`,
    expectedOutput: "hello, rPython",
  },
  {
    id: "static-typing",
    title: "Static typing (annotated locals)",
    filename: "static_typing.rpy",
    category: "basics",
    status: "working",
    summary:
      "Explicit types on locals — a: str = \"hello\" is checked at compile time; a: int = \"hello\" is a compile error.",
    tags: ["types", "static", "annotations"],
    source: `def main() -> int:
    a: str = "hello"
    n: int = 42
    print(a)
    print(n)
    return 0`,
    expectedOutput: "hello\\n42",
  },
  {
    id: "gcd",
    title: "Greatest common divisor",
    filename: "gcd.rpy",
    category: "control-flow",
    status: "working",
    summary: "While loops, modulo, locals, and function calls.",
    tags: ["while", "functions"],
    source: `def gcd(a: int, b: int) -> int:
    while b != 0:
        t = a % b
        a = b
        b = t
    return a

def main() -> int:
    print(gcd(48, 18))
    return 0`,
    expectedOutput: "6",
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    filename: "fizzbuzz.rpy",
    category: "control-flow",
    status: "partial",
    summary: "Classic loop exercise — exercises if/elif and printing.",
    tags: ["if", "loops"],
    source: `def fizzbuzz(n: int) -> int:
    i = 1
    while i <= n:
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)
        i = i + 1
    return 0

def main() -> int:
  fizzbuzz(15)
  return 0`,
  },
  {
    id: "factorial",
    title: "Factorial",
    filename: "factorial.rpy",
    category: "control-flow",
    status: "working",
    summary: "Recursive and iterative styles for numeric algorithms.",
    tags: ["recursion", "functions"],
    source: `def fact(n: int) -> int:
    if n <= 1:
        return 1
    return n * fact(n - 1)

def main() -> int:
    print(fact(6))
    return 0`,
    expectedOutput: "720",
  },
  {
    id: "structs-demo",
    title: "Struct literals",
    filename: "structs_demo.rpy",
    category: "types",
    status: "working",
    summary: "Named fields, struct construction, and field access.",
    tags: ["struct"],
    source: `struct Point:
    x: int
    y: int

def main() -> int:
    p = Point { x: 3, y: 4 }
    print(p.x)
    print(p.y)
    return 0`,
    expectedOutput: "3\\n4",
  },
  {
    id: "classes-demo",
    title: "Classes",
    filename: "classes_demo.rpy",
    category: "oop",
    status: "working",
    summary: "OOP with methods — the default way to combine state and behavior.",
    tags: ["class", "methods"],
    source: `class Greeter:
    def greet(self) -> int:
        print("hello from Greeter")
        return 0

def main() -> int:
    Greeter().greet()
    return 0`,
    expectedOutput: "hello from Greeter",
  },
  {
    id: "interfaces-demo",
    title: "Interfaces (static dispatch)",
    filename: "interfaces_demo.rpy",
    category: "oop",
    status: "working",
    summary: "v2 uses interface (not trait) for polymorphism — monomorphized at compile time.",
    tags: ["interface", "impl"],
    source: `interface Show:
    def show(self) -> str

struct Point:
    x: int
    y: int

impl Show for Point:
    def show(self) -> str:
        return "Point"

def main() -> int:
    p = Point { x: 1, y: 2 }
    print(p.show())
    return 0`,
  },
  {
    id: "traits-demo",
    title: "Deprecated trait alias",
    filename: "traits_demo.rpy",
    category: "oop",
    status: "working",
    summary: "trait is a deprecated alias for interface — prefer interface in new code.",
    tags: ["trait", "deprecated"],
    source: `trait Show:
    def show(self) -> str

struct Point:
    x: int
    y: int

impl Show for Point:
    def show(self) -> str:
        return "Point"

def main() -> int:
    p = Point { x: 1, y: 2 }
    print(p.show())
    return 0`,
  },
  {
    id: "option-pattern",
    title: "Option-style enums (stdlib sketch)",
    filename: "option_pattern.rpy",
    category: "stdlib",
    status: "roadmap",
    summary: "How Option[T] will look once prelude loading lands (P10).",
    tags: ["enum", "stdlib"],
    source: `# Planned: import from stdlib/core/option.rpy
# enum Option[T]:
#     Some(T)
#     None

def main() -> int:
    # x: Option[int] = Some(42)
  print("Option[T] ships with stdlib P10")
  return 0`,
  },
  {
    id: "vec-sketch",
    title: "Vec growable buffer (stdlib sketch)",
    filename: "vec_sketch.rpy",
    category: "stdlib",
    status: "roadmap",
    summary: "collections/vec.rpy — runtime-backed growable arrays.",
    tags: ["vec", "collections"],
    source: `# Planned: import collections.vec
# v = Vec[int]()
# v.push(1)
# v.push(2)
# for x in v:
#     print(x)

def main() -> int:
  print("Vec[T] — see stdlib/collections/vec.rpy")
  return 0`,
  },
  {
    id: "http-client",
    title: "HTTP GET client",
    filename: "http_client.rpy",
    category: "network",
    status: "roadmap",
    summary: "Target API for stdlib/net/http — fetch JSON from a REST endpoint.",
    tags: ["http", "async", "roadmap"],
    source: `# Roadmap (P10+): stdlib/net/http.rpy
# import net.http

def main() -> int:
    # resp = http.get("https://api.example.com/v1/status")
    # if resp.ok:
    #     print(resp.body)
    # else:
    #     print(resp.status)
    print("HTTP client — planned stdlib/net/http")
    return 0`,
  },
  {
    id: "http-server",
    title: "HTTP server",
    filename: "http_server.rpy",
    category: "network",
    status: "roadmap",
    summary: "Minimal router — listen, match routes, return responses.",
    tags: ["http", "server", "roadmap"],
    source: `# Roadmap: stdlib/net/http_server.rpy
# import net.http_server as srv

def main() -> int:
    # app = srv.App()
    # @app.get("/health")
    # def health() -> str:
    #     return "ok"
    # app.listen("127.0.0.1:8080")
    print("HTTP server — planned for v2.x stdlib")
    return 0`,
  },
  {
    id: "http-json-api",
    title: "JSON REST handler",
    filename: "http_json_api.rpy",
    category: "network",
    status: "roadmap",
    summary: "Parse JSON bodies, validate, and emit typed responses.",
    tags: ["json", "rest", "roadmap"],
    source: `# struct CreateUser:
#     name: str
#     email: str
#
# @app.post("/users")
# def create_user(body: CreateUser) -> int:
#     print(body.name)
#     return 201

def main() -> int:
  print("JSON handlers — serde + net modules on roadmap")
  return 0`,
  },
  {
    id: "extern-c",
    title: "extern C ABI",
    filename: "extern_c.rpy",
    category: "interop",
    status: "roadmap",
    summary: "Call into libc or your own .so via extern blocks (unsafe boundary).",
    tags: ["extern", "ffi", "c"],
    source: `# Parser accepts extern blocks today; codegen wiring is P6+.
# extern "C" {
#     fn strlen(s: *const u8) -> int
# }

def main() -> int:
  print("extern blocks — see DESIGN_SPEC.md")
  return 0`,
  },
  {
    id: "emit-mir",
    title: "Inspect MIR",
    filename: "hello.rpy",
    category: "compiler",
    status: "working",
    summary: "Dump mid-level IR for debugging the pipeline.",
    tags: ["mir", "cli"],
    source: `def main() -> int:
    print("hello, rPython")
    return 0`,
  },
];

export function getExampleById(id: string): RpyExample | undefined {
  return RPY_EXAMPLES.find((e) => e.id === id);
}

export function examplesByCategory(): Map<ExampleCategory, RpyExample[]> {
  const map = new Map<ExampleCategory, RpyExample[]>();
  for (const ex of RPY_EXAMPLES) {
    const list = map.get(ex.category) ?? [];
    list.push(ex);
    map.set(ex.category, list);
  }
  return map;
}

export const CATEGORY_ORDER: ExampleCategory[] = [
  "basics",
  "control-flow",
  "types",
  "oop",
  "stdlib",
  "network",
  "interop",
  "compiler",
];

export function runCommand(filename: string): string {
  return `rpythonc run examples/${filename}`;
}

export function buildCommand(filename: string, out = "out"): string {
  const base = filename.replace(/\.rpy$/, "") || "out";
  return `rpythonc build -o ./${out || base} examples/${filename}`;
}
