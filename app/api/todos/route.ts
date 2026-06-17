import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { validateTodoAction } from "@/lib/tier-limits";

const FREE_TIER_LIMIT = 10;
const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || undefined;

  try {
    const where = {
      userId,
      ...(search && {
        title: { contains: search, mode: "insensitive" as const },
      }),
      ...(status && { status: status as any }),
    };

    const [todos, totalItems] = await Promise.all([
      prisma.todo.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }),
      prisma.todo.count({ where }),
    ]);

    return NextResponse.json({
      todos,
      currentPage: page,
      totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, priority, status, dueDate } = await req.json();

    const gate = await validateTodoAction(
      userId,
      status === "TODAY" ? "MOVE_TO_TODAY" : "CREATE_TODO",
    );
    if (!gate.allowed) {
      return NextResponse.json({ error: gate.error }, { status: 403 });
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description,
        priority: priority ?? "MEDIUM",
        status: status ?? "BACKLOG",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
