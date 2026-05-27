/** Tutorial walkthroughs — linked from /docs/tutorials/[slug]. */

export type TutorialSection = {
  title: string;
  body: string[];
  code?: { title: string; source: string };
  tip?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  relatedExampleIds: string[];
  sections: TutorialSection[];
};

export const TUTORIALS: Tutorial[] = [
  {
    slug: "first-program",
    title: "Your first program",
    description: "Install rpythonc, run hello.rpy, then compile a native binary.",
    duration: "10 min",
    level: "beginner",
    relatedExampleIds: ["hello", "emit-mir"],
    sections: [
      {
        title: "What you are building",
        body: [
          "rPython is a compiled, statically typed language — not dynamic CPython. You write .rpy files, the type checker runs first, then MIR interpret or native build.",
        ],
      },
      {
        title: "Install",
        body: [
          "Use the install script from GitHub Releases (v2.0.0+). You need cc on PATH for build.",
        ],
        code: {
          title: "Terminal",
          source: `curl -fsSL https://raw.githubusercontent.com/dfunani/r_python/main/scripts/install.sh | bash
rpythonc --version`,
        },
      },
      {
        title: "Run with the interpreter",
        body: [
          "rpythonc run uses the MIR interpreter — no linker, fastest iteration.",
        ],
        code: {
          title: "hello.rpy",
          source: `def main() -> int:
    print("hello, rPython")
    return 0`,
        },
        tip: "Legacy flag: rpythonc --run hello.rpy",
      },
      {
        title: "Build a native binary",
        body: ["rpythonc build emits C, compiles with your system compiler, and links runtime helpers."],
        code: {
          title: "Terminal",
          source: `rpythonc build -o ./hello examples/hello.rpy
./hello`,
        },
      },
    ],
  },
  {
    slug: "static-typing",
    title: "Static typing (not dynamic)",
    description:
      "rPython is statically typed like Rust or Java — not dynamically typed like CPython.",
    duration: "10 min",
    level: "beginner",
    relatedExampleIds: ["static-typing", "hello"],
    sections: [
      {
        title: "Not CPython",
        body: [
          "In CPython, x = 1 then x = \"hi\" is fine at runtime. In rPython, every binding has a fixed type checked before your program runs. There is no gradual typing and no silent coercion from str to int.",
        ],
      },
      {
        title: "Annotated locals",
        body: [
          "Write name: Type = value. The compiler verifies that value matches Type.",
        ],
        code: {
          title: "static_typing.rpy",
          source: `def main() -> int:
    a: str = "hello"
    n: int = 42
    print(a)
    return 0`,
        },
      },
      {
        title: "Compile-time errors",
        body: [
          "This program must not compile — the annotation says int but the literal is str:",
        ],
        code: {
          title: "type error (do not run)",
          source: `def main() -> int:
    a: int = "hello"   # error: expected int, found str
    return 0`,
        },
        tip: "rpythonc reports: type mismatch: expected `int`, found `str`",
      },
      {
        title: "Function signatures",
        body: [
          "Parameters and return types are required on the paths you use today. Call sites are checked too — you cannot pass a str where an int is expected.",
        ],
      },
    ],
  },
  {
    slug: "functions-and-types",
    title: "Functions and types",
    description: "Typed parameters, returns, and the built-in numeric types.",
    duration: "15 min",
    level: "beginner",
    relatedExampleIds: ["gcd", "factorial", "static-typing"],
    sections: [
      {
        title: "Function signatures",
        body: [
          "Every function declares parameter and return types. The compiler checks calls at compile time — mistakes fail before you ship.",
        ],
        code: {
          title: "gcd.rpy",
          source: `def gcd(a: int, b: int) -> int:
    while b != 0:
        t = a % b
        a = b
        b = t
    return a`,
        },
      },
      {
        title: "Built-in types (v2)",
        body: [
          "Today: int, bool, str, void. More widths and collections arrive with stdlib modules (Option, Vec).",
        ],
      },
      {
        title: "Entry point",
        body: [
          "Programs start at main() -> int. Return 0 for success (Unix convention).",
        ],
      },
    ],
  },
  {
    slug: "control-flow",
    title: "Control flow",
    description: "while, if/elif, assignment, and loops for algorithms.",
    duration: "20 min",
    level: "beginner",
    relatedExampleIds: ["gcd", "fizzbuzz", "factorial"],
    sections: [
      {
        title: "While loops",
        body: ["Use while for iterative algorithms like Euclid's GCD."],
        code: {
          title: "gcd.rpy (excerpt)",
          source: `while b != 0:
    t = a % b
    a = b
    b = t`,
        },
      },
      {
        title: "Conditionals",
        body: [
          "if / elif / else use indentation blocks (Python-shaped). FizzBuzz is a good exercise once elif chains are fully wired in MIR.",
        ],
      },
      {
        title: "Recursion",
        body: ["Recursive functions work for tree and math problems — see factorial.rpy."],
        code: {
          title: "factorial.rpy",
          source: `def fact(n: int) -> int:
    if n <= 1:
        return 1
    return n * fact(n - 1)`,
        },
      },
    ],
  },
  {
    slug: "structs-and-classes",
    title: "Structs, classes, and interfaces",
    description: "Data-only structs vs OOP classes, and interface for polymorphism.",
    duration: "25 min",
    level: "intermediate",
    relatedExampleIds: ["structs-demo", "classes-demo", "interfaces-demo"],
    sections: [
      {
        title: "Structs — data layout",
        body: [
          "Structs are for plain data: named fields, struct literals, field access. No methods on the struct itself in the minimal form.",
        ],
        code: {
          title: "structs_demo.rpy",
          source: `struct Point:
    x: int
    y: int

def main() -> int:
    p = Point { x: 3, y: 4 }
    print(p.x)
    return 0`,
        },
      },
      {
        title: "Classes — behavior",
        body: [
          "Classes combine state and methods. Instantiate with ClassName() and call methods.",
        ],
        code: {
          title: "classes_demo.rpy",
          source: `class Greeter:
    def greet(self) -> int:
        print("hello from Greeter")
        return 0`,
        },
      },
      {
        title: "Interfaces (v2 keyword)",
        body: [
          "Use interface (not trait) for polymorphism. impl Interface for Type { ... } is monomorphized — static dispatch, zero runtime vtables in v2.0.",
        ],
        code: {
          title: "interfaces_demo.rpy",
          source: `interface Show:
    def show(self) -> str

impl Show for Point:
    def show(self) -> str:
        return "Point"`,
        },
        tip: "trait is deprecated but still parsed as an alias for interface.",
      },
    ],
  },
  {
    slug: "http-and-networking",
    title: "HTTP and networking (roadmap)",
    description: "How stdlib/net will look — clients, servers, and JSON APIs.",
    duration: "20 min",
    level: "intermediate",
    relatedExampleIds: ["http-client", "http-server", "http-json-api"],
    sections: [
      {
        title: "Status in v2.0",
        body: [
          "HTTP is not in the compiler binary yet. v2.0 ships the language surface (classes, interfaces, MIR, C backend). Networking lands in stdlib P10+ with net.http and net.http_server modules.",
          "The examples below are target API sketches — copy the ideas into your roadmap discussions and stdlib PRs.",
        ],
      },
      {
        title: "HTTP GET client",
        body: [
          "A future http.get returns a response struct with status, headers, and body. Errors are typed, not exceptions.",
        ],
        code: {
          title: "http_client.rpy (target)",
          source: `# import net.http
# resp = http.get("https://api.example.com/v1/status")
# if resp.ok:
#     print(resp.body)`,
        },
      },
      {
        title: "HTTP server",
        body: [
          "Decorator-style routes on an App, listen on a host:port. Designed for static dispatch and ahead-of-time compilation.",
        ],
        code: {
          title: "http_server.rpy (target)",
          source: `# app = srv.App()
# @app.get("/health")
# def health() -> str:
#     return "ok"
# app.listen("127.0.0.1:8080")`,
        },
      },
      {
        title: "JSON REST handlers",
        body: [
          "Structs map to JSON bodies; handlers return status codes. serde-style derive macros are on the roadmap.",
        ],
        code: {
          title: "http_json_api.rpy (target)",
          source: `# @app.post("/users")
# def create_user(body: CreateUser) -> int:
#     return 201`,
        },
      },
      {
        title: "What works today",
        body: [
          "Use print and file I/O builtins for CLI tools. For real HTTP now, call C libraries via extern blocks (parser support; codegen P6+) or shell out from your build script.",
        ],
      },
    ],
  },
  {
    slug: "compiler-tour",
    title: "Compiler tour",
    description: "Inspect tokens, AST, HIR, and MIR — understand every pipeline stage.",
    duration: "15 min",
    level: "advanced",
    relatedExampleIds: ["emit-mir", "hello"],
    sections: [
      {
        title: "Pipeline overview",
        body: [
          "Source → tokens → AST → resolve → typeck → HIR → MIR → (C | LLVM) → native binary.",
        ],
      },
      {
        title: "Emit flags",
        body: ["Use --emit to stop early and print intermediate representations."],
        code: {
          title: "CLI",
          source: `rpythonc --emit tokens examples/hello.rpy
rpythonc --emit ast examples/hello.rpy
rpythonc --emit high-level-ir examples/hello.rpy
rpythonc --emit mid-level-ir examples/hello.rpy`,
        },
      },
      {
        title: "run vs build",
        body: [
          "run — MIR interpreter, no linker. build — C codegen + cc. Use run while learning; use build for benchmarks and releases.",
        ],
      },
    ],
  },
  {
    slug: "stdlib-preview",
    title: "Standard library preview",
    description: "prelude, Option, Vec, and how imports will work.",
    duration: "10 min",
    level: "intermediate",
    relatedExampleIds: ["option-pattern", "vec-sketch"],
    sections: [
      {
        title: "Layout in the repo",
        body: [
          "stdlib/core/prelude.rpy — documented implicit imports",
          "stdlib/core/option.rpy — Option[T]",
          "stdlib/collections/vec.rpy — growable Vec[T]",
        ],
      },
      {
        title: "Builtins today",
        body: [
          "print, int, bool, str, void are wired in the resolver. Copy stdlib snippets into your .rpy until automatic prelude loading ships.",
        ],
      },
      {
        title: "Testing",
        body: [
          "rpythonc test will run programs under tests/ and examples/ once the test runner loads stdlib paths (P10).",
        ],
        code: {
          title: "Today",
          source: `cargo test --workspace   # compiler tests
rpythonc run examples/hello.rpy`,
        },
      },
    ],
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}

export function getTutorialSlugs(): string[] {
  return TUTORIALS.map((t) => t.slug);
}
