import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { validateTodoAction } from "@/lib/tier-limits";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: todoId } = await params;

    // 1. Fetch current todo to verify existence, ownership, and current state
    const todo = await prisma.todo.findFirst({
      where: { id: todoId, userId },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const { completed, title, description, priority, status, dueDate } =
      await req.json();

    // 2. Feature Gating: Check tier limits if moving a task INTO the 'TODAY' focus list
    if (status === "TODAY" && todo.status !== "TODAY") {
      const gate = await validateTodoAction(userId, "MOVE_TO_TODAY");
      if (!gate.allowed) {
        return NextResponse.json({ error: gate.error }, { status: 403 });
      }
    }

    // 3. Perform the update, using optional updates via spread operators
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(completed !== undefined && { completed }),
        ...(title && { title: title.trim() }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: todoId } = await params;
    const todo = await prisma.todo.findFirst({
      where: { id: todoId, userId },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({ where: { id: todoId } });
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
