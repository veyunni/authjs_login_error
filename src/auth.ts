'use server-only'

import NextAuth from "next-auth"

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@auth/dynamodb-adapter"

import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import Facebook from "next-auth/providers/facebook"

import { profile } from "console"

import { ROLES } from './roles';


const config: DynamoDBClientConfig = {
    credentials: {
        accessKeyId: process.env.AUTH_DYNAMODB_ID,
        secretAccessKey: process.env.AUTH_DYNAMODB_SECRET,
    },
    region: process.env.AUTH_DYNAMODB_REGION,
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
    marshallOptions: {
        convertEmptyValues:         true,
        removeUndefinedValues:      true,
        convertClassInstanceToMap:  true,
    },
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: !!process.env.AUTH_DEBUG,
    adapter: DynamoDBAdapter(client),
    providers: [
        Google ({
            profile(profile) {
                return  { id:    profile.id,
                          name:  profile.name,
                          email: profile.email,
                          image: profile.image,
                          role:  profile.role? profile.role : ROLES.USER
                }
            },
        }),
        Twitter ({
            profile(profile) {
                return { id:    profile.id,
                         name:  profile.name,
                         email: profile.email,
                         image: profile.image,
                         role : profile.role? profile.role : ROLES.USER
                }
            },
        }),
        Facebook ({
            profile(profile) {
                return { id:    profile.id,
                         name:  profile.name,
                         email: profile.email,
                         image: profile.image,
                         role : profile.role? profile.role : ROLES.USER
                }
            },
        })
    ],
    session: { strategy: "database" },
    callbacks : {
        async session({ session, token }) {
            if (token !== null && token !== undefined)
                session.user.role = token.role
            return session
        }
    }
});

