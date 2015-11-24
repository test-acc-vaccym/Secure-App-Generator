/*

Martus(TM) is a trademark of Beneficent Technology, Inc. 
This software is (c) Copyright 2015, Beneficent Technology, Inc.

Martus is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either
version 2 of the License, or (at your option) any later
version with the additions and exceptions described in the
accompanying Martus license file entitled "license.txt".

It is distributed WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, including warranties of fitness of purpose or
merchantability.  See the accompanying Martus License and
GPL license for more details on the required license terms
for this software.

You should have received a copy of the GNU General Public
License along with this program; if not, write to the Free
Software Foundation, Inc., 59 Temple Place - Suite 330,
Boston, MA 02111-1307, USA.

*/

package org.benetech.secureapp.generator;
import org.martus.util.TestCaseEnhanced;

public class TestAppNameValidation extends TestCaseEnhanced
{
	private NameAppController nameAppController;
	public TestAppNameValidation(String name)
	{
		super(name);
	}

	@Override
	protected void setUp() throws Exception
	{
		nameAppController = new NameAppController();
		super.setUp();
	}
	
	
	public void testValidateAppName() throws Exception
	{	
		AppConfiguration appConfig = new AppConfiguration();
		assertNull("no initial error msg",  appConfig.getAppNameError());
		assertFalse("Not configured valid app name?", nameAppController.validateAppName(appConfig));
		assertEquals("Incorrect error msg for not initalized appConfig with no Name", getLocalizedMessage("app_name_length"), appConfig.getAppNameError());
		appConfig.setAppName(VALID_NAME);
		assertTrue("Correct app name not valid?", nameAppController.validateAppName(appConfig));
		appConfig.setAppName(NAME_TOO_SHORT);
		assertFalse("App Name should be too short.", nameAppController.validateAppName(appConfig));
		assertEquals("error message for short name incorrect?", getLocalizedMessage("app_name_length"), appConfig.getAppNameError());
		appConfig.setAppName(NAME_TOO_LONG);
		assertFalse("App Name should be too long.", nameAppController.validateAppName(appConfig));
		assertEquals("error message for long name incorrect?", getLocalizedMessage("app_name_length"), appConfig.getAppNameError());
		appConfig.setAppName(NAME_STARTING_WITH_A_NUMBER);
		assertFalse("App Name starting with a Number", nameAppController.validateAppName(appConfig));
		assertEquals("error message for name beginning with a number incorrect?", getLocalizedMessage("app_name_numeric"), appConfig.getAppNameError());
		appConfig.setAppName(VALID_NAME_WITH_EXTRA_SPACES);
		assertTrue("App name with beginning/ending spaces not valid?", nameAppController.validateAppName(appConfig));
		assertEquals("Did not strip extra spaces from app name??", VALID_NAME, appConfig.getAppName());
		String illegalCharacters = "^!\"#$%&'()-\\.[]*+,/:;<=>?@`{|}~$";
		char[] charArray = illegalCharacters.toCharArray();
		for(int i = 0; i < illegalCharacters.length(); ++i)
		{
			testIllegalCharacter(appConfig, charArray[i]);
		}
	}
	//TODO add test for following illegal characters [^!\"#$%&'()\\[\\]*+,/:;<=>?@\\^`{|}~]+$

	private void testIllegalCharacter(AppConfiguration appConfig, char illegalCharacter)
	{
		appConfig.setAppName("My" + illegalCharacter + "App" );
		assertFalse("App Name with illegal character:"+illegalCharacter , nameAppController.validateAppName(appConfig));
		assertEquals("error message incorrect for illegal character:" + illegalCharacter, getLocalizedMessage("app_name_characters"), appConfig.getAppNameError());
	}

	public String getLocalizedMessage(String msg)
	{
		return SecureAppGeneratorApplication.getLocalizedErrorMessage(msg);
	}

	private final String VALID_NAME_WITH_EXTRA_SPACES = "  My Good App Name   ";
	private final String VALID_NAME = "My Good App Name";
	private final String NAME_TOO_SHORT = "My";
	private final String NAME_TOO_LONG = "My Really Long App Name More Than Thirty Characters";
	private final String NAME_STARTING_WITH_A_NUMBER = "1My incorrect File Name";
}
