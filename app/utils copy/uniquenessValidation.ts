import { mealList } from '../lib/meal/Index';
import { categoryList } from '../lib/category/Index';
import { bannerList } from '../lib/banner/Index';
import { dealList } from '../lib/deal/Index';

/**
 * Check if meal title is unique
 * @param title - Meal title to check
 * @param excludeId - Optional meal ID to exclude from check (for edit mode)
 */
export const checkMealTitleUnique = async (title: string, excludeId?: number): Promise<boolean> => {
    try {
        const response = await mealList({ search: title });
        if (response && response.data && Array.isArray(response.data)) {
            const existingMeal = response.data.find(
                (meal: any) => meal.title?.toLowerCase().trim() === title.toLowerCase().trim() && meal.id !== excludeId
            );
            return !existingMeal; // Return true if unique (no existing meal found)
        }
        return true; // If API fails, allow (backend will validate)
    } catch (error) {
        console.error('Error checking meal title uniqueness:', error);
        return true; // On error, allow (backend will validate)
    }
};

/**
 * Check if category name is unique
 * @param categoryName - Category name to check
 * @param excludeId - Optional category ID to exclude from check (for edit mode)
 */
export const checkCategoryNameUnique = async (categoryName: string, excludeId?: number): Promise<boolean> => {
    try {
        const response = await categoryList();
        if (response && response.data && Array.isArray(response.data)) {
            const existingCategory = response.data.find(
                (category: any) => category.category?.toLowerCase().trim() === categoryName.toLowerCase().trim() && category.id !== excludeId
            );
            return !existingCategory; // Return true if unique
        }
        return true;
    } catch (error) {
        console.error('Error checking category name uniqueness:', error);
        return true;
    }
};

/**
 * Check if banner title is unique
 * @param title - Banner title to check
 * @param excludeId - Optional banner ID to exclude from check (for edit mode)
 */
export const checkBannerTitleUnique = async (title: string, excludeId?: number): Promise<boolean> => {
    try {
        // Fetch banners with type 'self' to check uniqueness within restaurant's banners
        const response = await bannerList({ type: 'self' });
        if (response && response.data && Array.isArray(response.data)) {
            const existingBanner = response.data.find(
                (banner: any) => banner.title?.toLowerCase().trim() === title.toLowerCase().trim() && banner.id !== excludeId
            );
            const isUnique = !existingBanner;
            console.log('Banner uniqueness check:', { 
                title, 
                excludeId, 
                totalBanners: response.data.length,
                existingBanner: existingBanner ? { id: existingBanner.id, title: existingBanner.title } : null, 
                isUnique 
            });
            if (!isUnique) {
                console.log('❌ Duplicate banner found:', existingBanner);
            }
            return isUnique; // Return true if unique
        }
        console.log('Banner list API failed or returned no data, response:', response);
        return true; // On API failure, allow (backend will validate)
    } catch (error) {
        console.error('Error checking banner title uniqueness:', error);
        return true; // On error, allow (backend will validate)
    }
};

/**
 * Check if reward/deal title is unique (for active rewards only)
 * @param title - Reward title to check
 * @param excludeId - Optional deal ID to exclude from check (for edit mode)
 */
export const checkRewardTitleUnique = async (title: string, excludeId?: number): Promise<boolean> => {
    try {
        const response = await dealList(null);
        if (response && response.data && Array.isArray(response.data)) {
            // Filter for active rewards only - check various possible status fields
            const activeRewards = response.data.filter((deal: any) => 
                deal.status === 'active' || 
                deal.is_active === 1 || 
                deal.is_active === true ||
                (deal.status !== 'stopped' && deal.status !== 'inactive' && deal.status !== 'deleted')
            );
            const existingReward = activeRewards.find(
                (deal: any) => deal.title?.toLowerCase().trim() === title.toLowerCase().trim() && deal.id !== excludeId
            );
            return !existingReward; // Return true if unique
        }
        return true;
    } catch (error) {
        console.error('Error checking reward title uniqueness:', error);
        return true;
    }
};

/**
 * Check if staff email is unique within restaurant account
 * @param email - Email to check
 * @param excludeId - Optional staff ID to exclude from check (for edit mode)
 */
export const checkStaffEmailUnique = async (email: string, excludeId?: number): Promise<boolean> => {
    // TODO: Implement when staff API is available
    // For now, return true to allow (backend will validate)
    // This should call a staff list API and check for duplicate emails
    return true;
};
