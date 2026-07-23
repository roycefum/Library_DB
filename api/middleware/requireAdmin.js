// Simple shared-secret gate for write operations (POST/PUT/DELETE).
// Not full user auth/RBAC — just prevents public write access to a publicly
// shared demo link. Checks for a matching key in the 'x-admin-key' header.

function requireAdmin(req, res, next) {
    const providedKey = req.header('x-admin-key');

    if (!process.env.ADMIN_SECRET) {
        // Fail safe: if the server has no secret configured, block writes
        // rather than silently allowing them.
        console.error('ADMIN_SECRET is not set on the server.');
        return res.status(500).json({ error: 'Server auth is not configured.' });
    }

    if (!providedKey || providedKey !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized: missing or invalid admin key.' });
    }

    next();
}

module.exports = requireAdmin;
