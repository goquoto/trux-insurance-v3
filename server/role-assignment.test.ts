import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the ENV module
vi.mock("./_core/env", () => ({
  ENV: {
    ownerOpenId: "owner-open-id-123",
    ownerName: "Milen Milev",
  },
}));

// Mock drizzle
const mockInsert = vi.fn().mockReturnValue({
  values: vi.fn().mockReturnValue({
    onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
  }),
});
const mockSelect = vi.fn().mockReturnValue({
  from: vi.fn().mockReturnValue({
    where: vi.fn().mockReturnValue({
      limit: vi.fn().mockResolvedValue([]),
    }),
  }),
});

vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: () => ({
    insert: mockInsert,
    select: mockSelect,
  }),
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
}));

// Import after mocks
import { upsertUser } from "./db";

describe("Role Assignment Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
      }),
    });
  });

  it("random @gmail.com gets role=user, status=pending on new signup", async () => {
    let capturedValues: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedValues = vals;
        return {
          onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
        };
      }),
    });

    await upsertUser({
      openId: "random-user-123",
      name: "Random User",
      email: "randomuser@gmail.com",
      lastSignedIn: new Date(),
    });

    expect(capturedValues).toBeDefined();
    expect(capturedValues.role).toBe("user");
    expect(capturedValues.accountStatus).toBe("pending");
  });

  it("anything@truxins.com gets role=staff, status=approved on new signup", async () => {
    let capturedValues: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedValues = vals;
        return {
          onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
        };
      }),
    });

    await upsertUser({
      openId: "truxins-staff-456",
      name: "Staff Member",
      email: "newstaff@truxins.com",
      lastSignedIn: new Date(),
    });

    expect(capturedValues).toBeDefined();
    expect(capturedValues.role).toBe("staff");
    expect(capturedValues.accountStatus).toBe("approved");
  });

  it("truxins1@gmail.com does NOT get staff (substring match rejected)", async () => {
    let capturedValues: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedValues = vals;
        return {
          onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
        };
      }),
    });

    await upsertUser({
      openId: "truxins1-gmail-789",
      name: "Truxins Gmail User",
      email: "truxins1@gmail.com",
      lastSignedIn: new Date(),
    });

    expect(capturedValues).toBeDefined();
    expect(capturedValues.role).toBe("user");
    expect(capturedValues.accountStatus).toBe("pending");
  });

  it("owner openId gets role=admin, status=approved", async () => {
    let capturedValues: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedValues = vals;
        return {
          onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
        };
      }),
    });

    await upsertUser({
      openId: "owner-open-id-123",
      name: "Milen Milev",
      email: "milen@truxins.com",
      lastSignedIn: new Date(),
    });

    expect(capturedValues).toBeDefined();
    expect(capturedValues.role).toBe("admin");
    expect(capturedValues.accountStatus).toBe("approved");
  });

  it("existing user login does NOT override role in updateSet (role not in updateSet)", async () => {
    let capturedUpdateSet: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        onDuplicateKeyUpdate: vi.fn().mockImplementation((opts: any) => {
          capturedUpdateSet = opts.set;
          return Promise.resolve(undefined);
        }),
      }),
    });

    await upsertUser({
      openId: "existing-customer-xyz",
      name: "Customer User",
      email: "customer@gmail.com",
      lastSignedIn: new Date(),
    });

    expect(capturedUpdateSet).toBeDefined();
    // Role should NOT be in the updateSet — existing DB role wins
    expect(capturedUpdateSet.role).toBeUndefined();
    // accountStatus should NOT be in the updateSet for non-owner
    expect(capturedUpdateSet.accountStatus).toBeUndefined();
  });

  it("milen@truxins.com re-login does NOT override role or status in updateSet", async () => {
    let capturedUpdateSet: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        onDuplicateKeyUpdate: vi.fn().mockImplementation((opts: any) => {
          capturedUpdateSet = opts.set;
          return Promise.resolve(undefined);
        }),
      }),
    });

    await upsertUser({
      openId: "owner-open-id-123",
      name: "Milen Milev",
      email: "milen@truxins.com",
      lastSignedIn: new Date(),
    });

    expect(capturedUpdateSet).toBeDefined();
    // Role and accountStatus should NOT be in updateSet — existing DB row wins
    expect(capturedUpdateSet.role).toBeUndefined();
    expect(capturedUpdateSet.accountStatus).toBeUndefined();
  });

  it("explicit role change (admin action) applies to both insert and update", async () => {
    let capturedValues: any = null;
    let capturedUpdateSet: any = null;
    mockInsert.mockReturnValue({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedValues = vals;
        return {
          onDuplicateKeyUpdate: vi.fn().mockImplementation((opts: any) => {
            capturedUpdateSet = opts.set;
            return Promise.resolve(undefined);
          }),
        };
      }),
    });

    await upsertUser({
      openId: "some-user-abc",
      name: "Some User",
      email: "someuser@gmail.com",
      role: "customer",
      lastSignedIn: new Date(),
    });

    expect(capturedValues.role).toBe("customer");
    expect(capturedUpdateSet.role).toBe("customer");
  });
});
