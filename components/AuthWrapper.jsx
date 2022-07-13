import { useSigninCheck } from "reactfire";
import { useRouter } from "next/router";

export default function AuthWrapper({ children, fallback }) {
    const { status, data: signInCheckResult } = useSigninCheck();
    const router = useRouter();
    if (!children) {
        throw new Error('Children must be provided');
    }
    if (status === 'loading') {
        return <div>Loading</div>;
    } else if (signInCheckResult.signedIn === true) {
        return children;
    }

    router.push('/register');
};
