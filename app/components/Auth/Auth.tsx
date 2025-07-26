import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
    const { data: session } = useSession();

    return (
        <div className="auth">
            {!session ? (
                <button className="cursor-pointer" onClick={() => signIn('google')}>Sign In with Google</button>
            ) : (
                <div>
                <p>Welcome, {session.user?.name}</p>
                <button className="cursor-pointer" onClick={() => signOut()}>Sign Out</button>
                </div>
            )}
        </div>
    )
}
