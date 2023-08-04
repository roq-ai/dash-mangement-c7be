import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { backlinkValidationSchema } from 'validationSchema/backlinks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.backlink
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBacklinkById();
    case 'PUT':
      return updateBacklinkById();
    case 'DELETE':
      return deleteBacklinkById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBacklinkById() {
    const data = await prisma.backlink.findFirst(convertQueryToPrismaUtil(req.query, 'backlink'));
    return res.status(200).json(data);
  }

  async function updateBacklinkById() {
    await backlinkValidationSchema.validate(req.body);
    const data = await prisma.backlink.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBacklinkById() {
    const data = await prisma.backlink.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
