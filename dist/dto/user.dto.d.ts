import { selectUserDtoType } from "../db/schemas/user.schema";
export declare const userDTO: (user: selectUserDtoType) => {
    id: number;
    name: string | null;
    username: string | null;
    email: string | null;
    avatar: string | null;
    role: "creator" | "consumer";
    type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
    bio: string | null;
    dateOfBirth: Date | null;
    gender: "male" | "female" | "other";
    phone: string | null;
    isVerified: boolean;
    isBlocked: boolean;
    isActive: true;
    createdAt: Date | null;
    updatedAt: Date | null;
};
//# sourceMappingURL=user.dto.d.ts.map