import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });


        const { workflowRunId } = await workflowClient.trigger({
            url: "http://localhost:5500/api/v1/workflows/subscription/reminder",
            body: { subscriptionId: subscription._id },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0,
        });


        res.status(201).json({
            success: true,
            message: 'Subscription created successfully.',
            data: {subscription, workflowRunId},
        });
    } catch (error) {
        return next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id!== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
}